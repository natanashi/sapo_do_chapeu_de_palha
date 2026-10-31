# Artes da fase 4 — Raízes Profundas

Criadas com a ferramenta integrada **imagegen**, em 31/10/2026. Não houve uso de API/CLI alternativo. São criaturas e ambientes próprios do CroakFall; a referência a Hollow Knight se limita à jogabilidade de exploração e combate. O sapinho, a floresta da entrada e as plataformas de musgo usam os arquivos originais do jogo.

Arquivos finais:

- `assets/img/caverna-bichos-sprites-v1.png`: atlas transparente de 4 colunas × 3 linhas; tatuzinho de musgo, mariposa da raiz e Tatuzão de Raiz. O empacotamento de células é reproduzível com `tools/pack_cave_sprites.py`.
- `assets/img/caverna-raizes-fundo-v1.png`: fundo opaco da caverna, independente das plataformas e colisões.

## Prompt do atlas

Use case: stylized-concept. Production game sprite atlas for CroakFall, a warm handcrafted 16-bit pixel-art frog platformer. Transparent background. Exactly 4 columns and 3 rows, 12 equal square cells, generous transparent margins, no dividers, text or decorations. Each ROW is one original cave creature, all face LEFT, flat side view. Row 1: small mossy pill bug with a rounded brown segmented shell, tiny amber eyes, short little walking legs, four looping walking poses. Row 2: small pale mint cave moth, amber eyes, fuzzy compact body, four flutter poses. Row 3: the large cave boss 'Tatuzão de Raiz', a fierce armored burrowing beetle with earthy plum carapace plates, ivory digging claws, warm amber eyes, moss patches, no crown, no humanoid clothing. Four poses: neutral, crouched charging windup, running charge with claws forward, exhausted with lowered armor. Keep EVERY frame within its own cell. Consistent body size and body center for all four frames in each row, legs/wings vary only. Main silhouettes clear at native 64px size. True crisp square-pixel clusters, dark purple outline, restrained earthy sage brown plum palette, no smooth digital painting, no antialiasing, no drop shadow or background. No graphic violence. Original whimsical insects, not copies from any game.

## Prompt do ambiente

Use case: stylized-concept. Pixel-art environmental BACKGROUND for CroakFall, an original indie frog platformer. Wide landscape composition, a spacious underground root cavern, no characters and NO platforms or gameplay objects in foreground. Handcrafted true 16-bit pixel art at apparent 480x270 native resolution, crisp square pixel clusters, restrained desaturated deep teal, earthy brown and muted plum. Huge old roots descend around the left and right borders, distant vaulted stone and branching root silhouettes, sparse small luminous mint mushrooms and warm amber mineral flecks, soft distant shafts of daylight from a small opening high above. Center open and dark but readable for gameplay, layered sense of depth, friendly mysterious adventure rather than horror. Attractive carefully composed environment. Absolutely no water, lakes, rivers, waterfalls, text, HUD, smooth painted surfaces, photorealism, anti-aliased cartoon illustration or black vignette. No visual copies of Hollow Knight. Output is opaque background; pixel terrain platforms will be rendered separately in the game.

## Integração

O renderizador recorta cada quadro uma vez durante o carregamento. As criaturas mantêm a mesma escala entre quadros; o movimento das asas e a carapaça abaixada não mudam o tamanho do corpo. Corrida e ataque do jogador compartilham altura e apoio dos pés. O terreno e suas colisões usam unidades fixas, independentes da resolução da tela. A cena tem carregamento próprio e libera o canvas ao voltar ao mapa.
