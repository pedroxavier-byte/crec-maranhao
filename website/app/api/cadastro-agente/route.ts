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
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );
    const body = await req.json();
    const { nome, cpf, email, senha, telefone, municipios, organizacao } = body;

    if (!nome || !email || !senha || !cpf || !telefone || !municipios?.length) {
      return NextResponse.json({ error: 'Campos obrigatórios não preenchidos.' }, { status: 400 });
    }

    // Cria o usuário sem precisar de confirmação de e-mail
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password: senha,
      email_confirm: true,
      user_metadata: { nome },
    });

    if (authError) {
      if (
        authError.message.includes('already been registered') ||
        authError.message.includes('already registered') ||
        authError.message.includes('already exists')
      ) {
        return NextResponse.json(
          { error: 'Este e-mail já está cadastrado. Tente fazer login.' },
          { status: 400 }
        );
      }
      return NextResponse.json({ error: authError.message }, { status: 400 });
    }

    const { error: dbError } = await supabaseAdmin.from('agentes_territoriais').insert({
      user_id: authData.user.id,
      nome,
      cpf: cpf.replace(/\D/g, ''),
      email,
      telefone,
      municipios,
      organizacao: organizacao || '',
      status: 'pendente',
    });

    if (dbError) {
      // Desfaz a criação do usuário se o banco falhar
      await supabaseAdmin.auth.admin.deleteUser(authData.user.id);
      return NextResponse.json({ error: dbError.message }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || 'Erro interno. Tente novamente.' },
      { status: 500 }
    );
  }
}
