import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!serviceKey) {
      return NextResponse.json({ error: 'Configuração do servidor incompleta. Entre em contato com o administrador.' }, { status: 500 });
    }

    const supabaseAdmin = createClient(
      'https://pqpwhekpuyptpweyeymh.supabase.co',
      serviceKey,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const body = await req.json();
    const { nome, instituicao, telefone, email, cpf, lattes, endereco } = body;

    if (!nome || !instituicao || !telefone || !email || !cpf || !endereco) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos.' }, { status: 400 });
    }

    // Verifica e-mail duplicado
    const { data: existeEmail } = await supabaseAdmin
      .from('pesquisadores')
      .select('id')
      .eq('email', email)
      .single();

    if (existeEmail) {
      return NextResponse.json({ error: 'Este e-mail já está cadastrado.' }, { status: 400 });
    }

    // Verifica CPF duplicado
    const cpfLimpo = cpf.replace(/\D/g, '');
    const { data: existeCpf } = await supabaseAdmin
      .from('pesquisadores')
      .select('id')
      .eq('cpf', cpfLimpo)
      .single();

    if (existeCpf) {
      return NextResponse.json({ error: 'Este CPF já está cadastrado.' }, { status: 400 });
    }

    const { error: dbError } = await supabaseAdmin.from('pesquisadores').insert({
      nome,
      instituicao,
      telefone,
      email,
      cpf: cpfLimpo,
      lattes: lattes || '',
      endereco,
      status: 'pendente',
    });

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || 'Erro interno. Tente novamente.' }, { status: 500 });
  }
}
