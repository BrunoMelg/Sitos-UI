# Orchard UI — API Contracts

> **Status: ACTIVE.**  
> Este documento define os contratos de API públicos para todos os componentes da Orchard UI.  
> Nenhum componente pode ser mergeado se violar qualquer regra aqui.

---

## 1. Variant vs. Intent — separação obrigatória

Todo componente que possui variação visual usa **duas props distintas**:

| Prop | Controla | Valores válidos |
|------|---------|----------------|
| `variant` | **Forma visual** — como o componente se apresenta | `solid \| outline \| ghost \| subtle \| link` |
| `intent` | **Intenção semântica** — o que o componente comunica | `neutral \| accent \| danger \| warning \| success \| info` |

**Regras:**

- `variant` descreve a estrutura visual. Um Button `solid` tem fundo preenchido. Um Button `outline` tem borda sem fundo. A semântica é sempre neutra.
- `intent` aplica a paleta de cor semântica. Um Button `intent="danger"` comunica ação destrutiva. Um Badge `intent="success"` comunica estado bem-sucedido.
- Componentes sem variação de forma omitem `variant`. Componentes sem variação semântica omitem `intent`.
- **Nunca use `variant="primary"`, `variant="destructive"`, `variant="danger"`.** Esses valores conflacionam forma com intenção.

```tsx
// ✓ Correto — forma e intenção separadas
<Button variant="solid" intent="accent">Salvar</Button>
<Button variant="outline" intent="danger">Excluir</Button>
<Button variant="ghost" intent="neutral">Cancelar</Button>

// ❌ Errado — "primary" conflaciona forma e intenção
<Button variant="primary">Salvar</Button>

// ❌ Errado — "destructive" é intenção disfarçada de forma
<Button variant="destructive">Excluir</Button>
```

---

## 2. Size vs. Density

| Prop | Controla | Quem define |
|------|---------|------------|
| `size` | Tamanho físico intrínseco do componente | Prop direta (`xs \| sm \| md \| lg \| xl`) |
| density | Compactação do layout | `DensityProvider` — **nunca prop direta** |

**Regras:**

- `size` é para componentes com tamanho intrínseco independente do contexto: Avatar, IconButton, Badge, Spinner.
- Density afeta padding, gap, e tamanho de fonte mas **nunca é configurada por prop individual**. O contexto `DensityProvider` propaga a densidade para toda a árvore.
- Button, Input, Select e similares **não têm prop `size`** — seu tamanho segue a density do contexto.

```tsx
// ✓ Avatar tem tamanho intrínseco — usa size
<Avatar size="lg" src="..." />

// ✓ Density via contexto — afeta todos os filhos
<DensityProvider density="compact">
  <Form>
    <Input />
    <Button variant="solid" intent="accent">Enviar</Button>
  </Form>
</DensityProvider>

// ❌ Button não tem prop size — densidade vem do contexto
<Button size="sm">Errado</Button>
```

---

## 3. Estado Controlado vs. Não-controlado

### Regra geral

Cada estado controlável segue um de dois contratos:

**Tipo A — Par controlado** (o componente é uma fonte de verdade opcional):

```ts
// Controlled: valor + handler
value?: T
onChange?: (value: T) => void

// Uncontrolled: valor default inicial
defaultValue?: T
```

**Tipo B — Descritor de estado** (one-way, sem controle interno):

```ts
// Não têm par default* ou on*Change
isDisabled?: boolean
isLoading?: boolean
isReadOnly?: boolean
isRequired?: boolean
isInvalid?: boolean
```

### Por que a distinção importa

Ambos usam o prefixo `is`. A diferença: Tipo A permite que o consumidor assuma o controle total. Tipo B é sempre um dado externo — o componente nunca gerencia esse estado internamente.

| Prop | Tipo | Par |
|------|------|-----|
| `isOpen` | A | `defaultOpen` + `onOpenChange` |
| `isChecked` | A | `defaultChecked` + `onCheckedChange` |
| `isExpanded` | A | `defaultExpanded` + `onExpandedChange` |
| `value` | A | `defaultValue` + `onChange` |
| `isDisabled` | B | — |
| `isLoading` | B | — |
| `isReadOnly` | B | — |
| `isRequired` | B | — |
| `isInvalid` | B | — |

---

## 4. Nomenclatura de Callbacks

| Evento | Nome do callback | Assinatura |
|--------|-----------------|-----------|
| Valor string/number muda | `onChange` | `(value: T) => void` |
| Estado boolean abre/fecha | `onOpenChange` | `(isOpen: boolean) => void` |
| Estado boolean checked muda | `onCheckedChange` | `(isChecked: boolean) => void` |
| Estado boolean expanded muda | `onExpandedChange` | `(isExpanded: boolean) => void` |
| Item selecionado em coleção | `onSelectionChange` | `(key: Key) => void` |
| Formulário submetido | `onSubmit` | `(event: FormEvent) => void` |
| Elemento recebe foco | `onFocus` | `(event: FocusEvent) => void` |
| Elemento perde foco | `onBlur` | `(event: FocusEvent) => void` |

**Nunca use:** `onUpdate`, `onSet`, `onToggle`, `onPress`, `onTap`, `onSelect` (ambíguo).

---

## 5. Slot Strategy

A Orchard UI usa dois padrões de composição, dependendo da complexidade:

### Slots simples — props nomeadas

Para slots de um único elemento (ícone, prefixo, sufixo):

```tsx
// Props de slot simples
interface InputProps {
  leadingElement?: ReactNode   // ícone, texto, avatar à esquerda
  trailingElement?: ReactNode  // ícone, botão de clear à direita
}

<Input leadingElement={<SearchIcon />} trailingElement={<ClearButton />} />
```

Nomes canônicos de slot simples:

| Nome | Posição |
|------|---------|
| `leadingElement` | Início (inline-start) |
| `trailingElement` | Final (inline-end) |
| `topElement` | Acima do conteúdo principal |
| `bottomElement` | Abaixo do conteúdo principal |

### Slots estruturais — compound components

Para estruturas com múltiplas regiões de conteúdo autônomo:

```tsx
// Compound component — cada região é um sub-componente nomeado
<Card.Root>
  <Card.Header>
    <Card.Title>Título</Card.Title>
    <Card.Description>Descrição opcional</Card.Description>
  </Card.Header>
  <Card.Body>Conteúdo</Card.Body>
  <Card.Footer>
    <Button>Ação</Button>
  </Card.Footer>
</Card.Root>
```

**Regra de decisão:** Se o slot é um elemento único e opcional → prop nomeada. Se o slot tem estrutura própria, pode conter múltiplos filhos, ou existe independentemente → sub-componente.

---

## 6. Polymorphism — `asChild`

A Orchard UI usa exclusivamente o padrão `asChild` para polimorfismo. **A prop `as` não existe.**

```tsx
// asChild — o elemento do consumer assume o DOM node
// O Button contribui comportamento, o Link do router é o DOM node
<Button asChild>
  <Link to="/dashboard">Dashboard</Link>
</Button>

// Heading muda de tag internamente — usa prop semântica, não asChild
<Heading level={2}>Seção</Heading>  // level controla h1-h6 internamente
```

**Quando usar `asChild`:**
- O consumer precisa que o DOM node seja um elemento específico (router Link, âncora nativa)
- O consumer quer combinar comportamento de dois componentes em um único DOM node

**Nunca use `as` prop.** A razão: `as` mantém o Orchard como dono do DOM node enquanto troca o tipo — isso cria ambiguidade sobre quem é responsável pelos atributos e refs.

---

## 7. A prop `className`

`className` é aceita em todos os componentes públicos como escape hatch.

**Contrato:**

```tsx
// className é sempre mergeada com as classes internas do componente
// Nunca substitui — sempre adiciona ao final
interface ComponentProps {
  className?: string
}
```

**Garantias:**
- Classes VE internas têm especificidade estável (gerada no build)
- `className` do consumer tem especificidade da ordem de declaração no stylesheet do consumer
- Conflitos de especificidade são responsabilidade do consumer

**O que pode ser feito com `className`:**
```tsx
// ✓ Layout e posicionamento — não afetam o sistema de design
<Button className={styles.fullWidth} />

// ✓ Classes VE do consumer — mesma stack, comportamento previsível
<Button className={myButtonOverride} />
```

**O que não deve ser feito:**
```tsx
// ❌ Hardcode de valores de design — quebra a consistência
<Button className="bg-[#FF0000] p-[13px]" />
```

---

## 8. IDs em Grupos de Formulário

O padrão de associação de label + input + mensagem de erro usa `useId()` interno:

```tsx
// O FormField gera e distribui IDs via Context
<FormField>
  <FormField.Label>Email</FormField.Label>       {/* for="{id}" automático */}
  <FormField.Input />                             {/* id="{id}" automático */}
  <FormField.Error>Campo obrigatório</FormField.Error>  {/* id="{id}-error" automático */}
</FormField>
```

**Nunca passe `id` manualmente em componentes de formulário que vivem dentro de `FormField`.** O ID é gerado internamente e garantido único por instância.

Se um input existe fora de um `FormField`, o `id` deve ser passado explicitamente:
```tsx
// Fora de FormField — id explícito é obrigatório para acessibilidade
<label htmlFor="search">Buscar</label>
<Input id="search" />
```

---

## 9. Coleções — `selectedKey` vs `value`

Componentes que renderizam listas de itens selecionáveis (Select, RadioGroup, Tabs, ListBox) usam vocabulário de coleção:

| Prop | Tipo | Quando usar |
|------|------|------------|
| `selectedKey` | `Key` (string \| number) | Um item selecionado de uma coleção |
| `selectedKeys` | `Set<Key>` | Múltiplos itens selecionados |
| `defaultSelectedKey` | `Key` | Uncontrolled, um item |
| `defaultSelectedKeys` | `Set<Key>` | Uncontrolled, múltiplos |
| `onSelectionChange` | `(key: Key) => void` | Handler de seleção simples |

Componentes de valor simples (Input, Textarea, NumberField) continuam usando `value` / `defaultValue` / `onChange`.

---

## 10. Forbidden Patterns

```tsx
// ❌ Props booleanas sem prefixo is
<Button disabled />        // use isDisabled
<Input loading />          // use isLoading

// ❌ variant conflacionando forma e semântica
<Button variant="danger" />
<Button variant="primary" />

// ❌ Nomes de callback não-padronizados
onPress, onTap, onUpdate, onSet, onSelect, onClick para estado

// ❌ size em componentes de layout denso
<Button size="sm" />  // densidade vem do DensityProvider

// ❌ Polimorfismo via as prop
<Button as="a" href="/" />  // use asChild

// ❌ Valores hardcoded no className
<Button className="p-4 bg-green-500" />
```
