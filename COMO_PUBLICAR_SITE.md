# Como publicar o site do CREC-MA (GRÁTIS)

## Plataformas utilizadas
- **GitHub** (gratuito) — guarda o código
- **Vercel** (gratuito) — publica o site automaticamente

---

## PASSO 1 — Criar conta no GitHub
1. Acesse: https://github.com
2. Clique em "Sign up" e crie sua conta gratuita

## PASSO 2 — Criar repositório no GitHub
1. Clique em "New repository"
2. Nome: `crec-maranhao`
3. Deixe como "Public"
4. Clique em "Create repository"

## PASSO 3 — Enviar o projeto para o GitHub
No terminal, dentro da pasta crec-maranhao:
```
git init
git add .
git commit -m "Projeto CREC-MA - versão inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/crec-maranhao.git
git push -u origin main
```

## PASSO 4 — Criar conta na Vercel
1. Acesse: https://vercel.com
2. Clique em "Sign Up with GitHub" (usa a conta do GitHub)

## PASSO 5 — Publicar o site na Vercel
1. Na Vercel, clique em "Add New Project"
2. Selecione o repositório "crec-maranhao"
3. Em "Root Directory", clique em "Edit" e escreva: `website`
4. Em "Framework Preset", selecione: **Next.js**
5. Clique em "Deploy"
6. Aguarde ~2 minutos — o site estará no ar!

## Como o link app ↔ site funciona
Quando você mudar qualquer informação no app (escola, notícia, material):
1. Salva os arquivos no computador
2. Abre o terminal e digita:
   ```
   git add .
   git commit -m "Atualização: [descreva o que mudou]"
   git push
   ```
3. A Vercel detecta automaticamente e publica o site atualizado em ~1 minuto!

## Endereço do site
Após publicar, a Vercel dará um endereço como:
`crec-maranhao.vercel.app`

Você pode comprar um domínio personalizado depois (ex: crecma.org.br)
e conectar gratuitamente na Vercel.
