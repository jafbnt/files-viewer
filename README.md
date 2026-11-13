# files-viewer

Visualizador de arquivos para **React 19+**: PDF, imagens, vídeo, CSV, texto, HTML e Microsoft Office — tudo em um componente.

Fork mantido de [`@cyntler/react-doc-viewer`](https://github.com/cyntler/react-doc-viewer).

## Instalação

```bash
npm install files-viewer
```

Peers: `react` e `react-dom` ≥ 19.

## Uso básico

```tsx
import DocViewer, {
  DocViewerRenderers,
  FILE_TYPE_MIME_MAP,
} from "files-viewer";
import "files-viewer/dist/index.css";

export function FilePreview({ uri, name }: { uri: string; name: string }) {
  return (
    <DocViewer
      language="pt"
      style={{ height: "100%" }}
      documents={[
        {
          uri,
          fileName: name,
          fileType: FILE_TYPE_MIME_MAP.pdf,
        },
      ]}
      pluginRenderers={DocViewerRenderers}
      config={{
        header: {
          disableHeader: true,
          disableFileName: true,
        },
      }}
    />
  );
}
```

## Vários documentos

```tsx
const documents = [
  {
    uri: "https://exemplo.com/relatorio.pdf",
    fileName: "relatorio.pdf",
    fileType: FILE_TYPE_MIME_MAP.pdf,
  },
  {
    uri: "https://exemplo.com/planilha.xlsx",
    fileName: "planilha.xlsx",
    fileType: FILE_TYPE_MIME_MAP.xlsx,
  },
];

<DocViewer
  language="pt"
  documents={documents}
  initialActiveDocument={documents[0]}
  pluginRenderers={DocViewerRenderers}
/>;
```

## Props principais

| Prop | Tipo | Descrição |
| ---- | ---- | --------- |
| `documents` | `IDocument[]` | Lista de arquivos (`uri`, `fileName?`, `fileType?`) |
| `pluginRenderers` | `DocRenderer[]` | Use `DocViewerRenderers` para os renderers embutidos |
| `language` | `string` | Ex.: `"pt"`, `"en"`, `"es"` |
| `activeDocument` | `IDocument` | Documento ativo controlado |
| `initialActiveDocument` | `IDocument` | Documento inicial |
| `onDocumentChange` | `(doc) => void` | Callback ao trocar de arquivo |
| `config` | `IConfig` | Header, loading, PDF zoom, worker, etc. |
| `theme` | `ITheme` | Cores via CSS variables |
| `className` / `style` | — | Estilo do container |

### `config` útil

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  config={{
    header: {
      disableHeader: true,
      disableFileName: true,
      disableDocumentNav: true,
    },
    pdfControls: {
      disable: true, // esconde a toolbar inteira do PDF
      // ou individualmente: disableZoomIn, disableDownload, ...
    },
    imageControls: {
      disable: true, // esconde a toolbar de imagem
      // disableZoomIn, disableRotateLeft, disableRotateRight, ...
    },
    imageZoom: { defaultZoom: 1, zoomJump: 0.2 },
    videoControls: {
      disable: true, // remove controls nativos do <video>
    },
    loadingRenderer: {
      overrideComponent: () => <MeuSpinner />,
    },
    noRenderer: {
      overrideComponent: () => <Empty description="Formato não suportado" />,
    },
    pdfZoom: { defaultZoom: 1, zoomJump: 0.2 },
    pdfVerticalScrollByDefault: true,
    // CSP: hospede o worker e passe a URL
    pdfWorkerUrl: "/pdf.worker.min.mjs",
  }}
/>
```

### Controles externos (`ref`)

Esconda a toolbar nativa e use seus próprios botões (Ant Design, etc.):

```tsx
import { useRef, useState } from "react";
import { Button } from "antd";
import DocViewer, {
  DocViewerRenderers,
  type DocViewerRef,
  type ImageControlsState,
  type PdfControlsState,
} from "files-viewer";

function Preview() {
  const viewerRef = useRef<DocViewerRef>(null);
  const [pdf, setPdf] = useState<PdfControlsState | null>(null);
  const [image, setImage] = useState<ImageControlsState | null>(null);

  return (
    <>
      {pdf && (
        <>
          <Button onClick={() => viewerRef.current?.pdf?.zoomOut()}>−</Button>
          <Button onClick={() => viewerRef.current?.pdf?.zoomIn()}>+</Button>
          <Button onClick={() => viewerRef.current?.pdf?.download()}>
            Download
          </Button>
        </>
      )}

      {image && (
        <>
          <Button onClick={() => viewerRef.current?.image?.zoomOut()}>−</Button>
          <Button onClick={() => viewerRef.current?.image?.zoomIn()}>+</Button>
          <Button onClick={() => viewerRef.current?.image?.rotateLeft()}>
            ↶
          </Button>
          <Button onClick={() => viewerRef.current?.image?.rotateRight()}>
            ↷
          </Button>
        </>
      )}

      <DocViewer
        ref={viewerRef}
        documents={docs}
        pluginRenderers={DocViewerRenderers}
        onPdfStateChange={setPdf}
        onImageStateChange={setImage}
        config={{
          header: { disableHeader: true },
          pdfControls: { disable: true },
          imageControls: { disable: true },
        }}
      />
    </>
  );
}
```

API do `ref`:

| Método | Descrição |
| ------ | --------- |
| `prev()` / `next()` | Navega entre documentos |
| `pdf?.zoomIn()` / `zoomOut()` / `zoomReset()` / `setZoomLevel(n)` | Zoom PDF |
| `pdf?.prevPage()` / `nextPage()` / `setPage(n)` | Páginas |
| `pdf?.togglePagination()` / `setPaginated(bool)` | Modo página vs scroll |
| `pdf?.download()` / `pdf?.getState()` | Download / snapshot |
| `image?.zoomIn()` / `zoomOut()` / `zoomReset()` / `setZoomLevel(n)` | Zoom imagem |
| `image?.rotateLeft()` / `rotateRight()` / `rotateReset()` / `setRotation(deg)` | Rotação |
| `image?.download()` / `image?.getState()` | Download / snapshot |
| `video?.play()` / `pause()` / `togglePlay()` / `seek(t)` / `setVolume(v)` / `setMuted(b)` | Player |
| `video?.getState()` | Snapshot do vídeo |

## Arquivos suportados

| Extensão | MIME | Renderer | Observação |
| -------- | ---- | -------- | ---------- |
| `bmp` | `image/bmp` | BMP | |
| `gif` | `image/gif` | GIF | |
| `jpg` / `jpeg` | `image/jpg`, `image/jpeg` | JPG | |
| `png` | `image/png` | PNG | |
| `webp` | `image/webp` | WebP | |
| `tif` / `tiff` | `image/tif`, `image/tiff` | TIFF | |
| `pdf` | `application/pdf` | PDF | Nativo (`react-pdf`) |
| `txt` | `text/plain` | TXT | Texto escapado (sem HTML) |
| `csv` | `text/csv` | CSV | |
| `htm` / `html` | `text/htm`, `text/html` | HTML | iframe sandbox |
| `mp4` | `video/mp4` | Video | |
| `mov` | `video/quicktime` | Video | |
| `avi` | `video/x-msvideo` | Video | |
| `webm` | `video/webm` | Video | |
| `doc` | `application/msword` | MS Office | **URL pública** (Office Online) |
| `docx` | `application/vnd.openxmlformats-officedocument.wordprocessingml.document` | MS Office | **URL pública** |
| `xls` | `application/vnd.ms-excel` | MS Office | **URL pública** |
| `xlsx` | `application/vnd.openxmlformats-officedocument.spreadsheetml.sheet` | MS Office | **URL pública** |
| `ppt` | `application/vnd.ms-powerpoint` | MS Office | **URL pública** |
| `pptx` | `application/vnd.openxmlformats-officedocument.presentationml.presentation` | MS Office | **URL pública** |
| `odt` | `application/vnd.oasis.opendocument.text` | MS Office | **URL pública** |

Helpers tipados exportados:

- `SUPPORTED_FILE_TYPES` — catálogo completo
- `SUPPORTED_EXTENSIONS` — lista de extensões
- `FILE_TYPE_MIME_MAP` — mapa `extensão → MIME`

> Documentos Microsoft / ODT usam o iframe do **Office Online**. A URL precisa ser **pública e acessível pela Microsoft** (URLs assinadas/privadas de S3 costumam falhar).

## Estilos e tema

Importe o CSS da lib (obrigatório):

```tsx
import "files-viewer/dist/index.css";
```

CSS gerado com Tailwind 4 (prefixo `fv:`), sem preflight — não reseta o app consumidor.

```tsx
<DocViewer
  documents={docs}
  pluginRenderers={DocViewerRenderers}
  theme={{
    primary: "#ffffff",
    secondary: "#111827",
    tertiary: "#ffffff99",
    textPrimary: "#111827",
    textSecondary: "#ffffff",
    textTertiary: "#00000044",
  }}
/>
```

## Desenvolvimento

```bash
npm install
npm run build   # gera dist/
npm test
npm run audit
```

## Licença

Apache-2.0 (herdada do projeto original).
