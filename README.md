# CHAPA 2 • NOVA VISÃO — Condomínio Villa do Pescador

Portal oficial de divulgação da **CHAPA 2 • NOVA VISÃO** para as eleições da Associação dos Moradores do Condomínio Villa do Pescador.

O projeto foi construído para ser **100% responsivo (Mobile e PC)**, ultrarrápido, otimizado para compartilhamento via WhatsApp e pronto para publicação imediata na **Vercel**.

---

## 🌟 Destaques do Projeto

1. **Atenção Especial ao PDF (Plano de Gestão Oficial - 10 Páginas A4)**:
   - Visualizador interativo página a página com carrossel de miniaturas, suporte a toque (*swipe* no celular) e navegação rápida por eixos.
   - Botão de download direto do documento PDF em alta resolução.
   - Modo de ampliação em tela cheia (*lightbox*).

2. **Privacidade e Proteção de Dados (LGPD & Diretrizes Eleitorais)**:
   - **Totalmente higienizado**: nenhum dado sensível pessoal (e-mails pessoais, números de celular ou contatos privados dos candidatos) é exposto no site, no PDF ou nas artes.
   - Orientações seguras sobre como solicitar modelos de procuração através dos canais comunitários oficiais da chapa.

3. **Nossa Equipe & Organograma Oficial**:
   - **Diretoria Executiva**:
     - **Claubevanio Barros** (Presidente) — Empresário, Gestão Financeira, Síndico atuante com 5 anos de experiência condominial comprovada.
     - **Vanessa Cardoso** (Vice-Presidente) — Gestão Estratégica, Moradora atuante, Parceria Ativa e escuta da comunidade.
   - **Conselho Fiscal Titular**:
     - **Almir Antônio** (Presidente do Conselho Fiscal) — Servidor Público Federal.
     - **Kênia Cristina Rodrigues** (2º Membro do Conselho Fiscal) — Fiscalização Financeira & Rigor nas Contas.
     - **Ronny Santos** (3º Membro do Conselho Fiscal) — Gerente Comercial & Cotação Tríplice.
   - **Suplentes**:
     - **Rennê Veríssimo de Lima** — Enfermeiro, Gestão Humanizada e Apoio ao Espaço Sensorial TEA.
     - **Ângela Nava de Lira** — Servidora Pública, Compliance Legal e Articulação Institucional.
   - Fichas biográficas detalhadas de cada candidato em alta definição.

4. **Eixos Estratégicos & Propostas de Gestão**:
   - 🛒 **Minimercado Autônomo 24h**: Custo ZERO de instalação para o condomínio e receita comercial revertida ao caixa da Associação.
   - ⛵ **Baias de Lazer Náutico**: Quiosques gourmet individuais às margens do lago, com privacidade acústica e valorização patrimonial.
   - ♻️ **Recicla Villa**: Coleta seletiva com pagamento de **R$ 3,00 /kg** direto ao morador participante e 100% da margem reinvestida em melhorias.
   - ⚓ **Guarda-Barcos Estruturado**: Monitoramento 24h, ponto de lavagem (*Boat Wash*) e fim de embarcações bloqueando vias.
   - ♿ **Acessibilidade & Espaço Sensorial TEA**: Rampas NBR 9050 e acolhimento dedicado a famílias atípicas e crianças no espectro autista.
   - 📊 **Transparência & Cotação Tríplice**: Prestação de contas mensal aberta e obrigatoriedade de 3 orçamentos documentados.
   - ⚡ **Infraestrutura Essencial**: Acompanhamento técnico junto à Equatorial Energia e cobrança jurídica contundente da construtora.

5. **Galeria Multimídia de Divulgação**:
   - Filtros dinâmicos: Cards dos Projetos (8), Flyers Verticais para Stories/Status (8), Fichas Individuais (5) e Páginas do PDF (10).
   - Lightbox para visualização e download em alta qualidade.

6. **Guia do Eleitor & Voto por Procuração**:
   - Passo a passo claro para quem votará presencialmente e para quem não estiver presente e votará por procuração (com suporte à assinatura digital do Gov.br).

---

## 🚀 Como Subir na Vercel

O projeto está configurado para deploy estático com `vercel.json` e `.vercelignore` já definidos, garantindo zero erros de build e bloqueando arquivos privados (como históricos de conversas).

### Opção 1: Via Linha de Comando (Vercel CLI)
No terminal desta pasta, execute:
```bash
npx vercel
```
- Se for a primeira vez, faça o login na sua conta Vercel quando solicitado no navegador.
- Confirme as opções padrão (pressione Enter para aceitar o diretório e o nome do projeto).
- Para publicar em produção definitiva:
```bash
npx vercel --prod
```

### Opção 2: Conectando com GitHub (Deploy Automático)
1. Crie um repositório no seu GitHub (público ou privado).
2. Suba os arquivos da pasta:
   ```bash
   git init
   git add .
   git commit -m "Site oficial da campanha CHAPA 2 - Villa do Pescador"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
   git push -u origin main
   ```
3. Acesse o painel da [Vercel](https://vercel.com).
4. Clique em **Add New** > **Project** e importe o repositório.
5. Clique em **Deploy** (sem necessidade de alterar nenhuma configuração!).

---

## 💻 Como Visualizar Localmente

Basta abrir o arquivo `index.html` em qualquer navegador ou rodar:
```bash
npx serve .
```
E acessar no navegador: `http://localhost:3000`.

---

## 📁 Estrutura de Arquivos

```
├── index.html                                        # Página principal responsiva
├── vercel.json                                       # Configuração de cache e segurança Vercel
├── package.json                                      # Metadados do projeto
├── .vercelignore                                     # Bloqueio de arquivos privados no deploy
├── .gitignore                                        # Exclusões para Git
├── assets/
│   ├── css/
│   │   └── styles.css                                # Estilos modernos (verde escuro e dourado)
│   ├── js/
│   │   └── main.js                                   # Lógica interativa do PDF, galeria e modais
│   ├── pdf/
│   │   └── Plano_de_Gestao_Chapa2_Villa_do_Pescador.pdf  # PDF oficial higienizado (10 pág)
│   └── images/
│       ├── logo/                                     # Brasão oficial
│       ├── candidates/                               # Fotos da diretoria e conselho
│       ├── cards/                                    # 8 Cards de projetos (WebP + PNG)
│       ├── flyers/                                   # 8 Flyers verticais para redes (WebP + PNG)
│       ├── individual/                               # 5 Fichas biográficas individuais
│       └── pages/                                    # 10 Páginas do PDF para o leitor interativo
```
