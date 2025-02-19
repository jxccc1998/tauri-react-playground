import MonacoEditor, {EditorProps, OnMount} from '@monaco-editor/react'
import {createATA} from "./ata.ts";
// @ts-ignore
import { editor } from 'monaco-editor'

export interface EditorFile {
    name: string
    value: string
    language: string
}

interface Props {
    file: EditorFile
    onChange?: EditorProps['onChange'],
    options?: editor.IStandaloneEditorConstructionOptions
}

export default function Editor(props: Props) {
    const {
        file,
        onChange,
        options
    } = props;

    // 修改编辑器的tsconfig
    const handleEditorMount: OnMount = (editor, monaco) => {
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyJ, () => {
            editor.getAction('editor.action.formatDocument')?.run()
        });
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            jsx: monaco.languages.typescript.JsxEmit.Preserve,
            esModuleInterop: true,
        })

        // 用 ts 包去分析代码，然后自动下载用到的类型包
        const ata = createATA((code, path) => {
            monaco.languages.typescript.typescriptDefaults.addExtraLib(code, `file://${path}`)
        })

        editor.onDidChangeModelContent(() => {
            ata(editor.getValue());
        });

        ata(editor.getValue());
    }

    return <MonacoEditor
        height='100%'
        path={file.name}
        language={file.language}
        onMount={handleEditorMount}
        value={file.value}
        onChange={onChange}
        options={
            {
                fontSize: 14,
                scrollBeyondLastLine: false,
                minimap: {
                    enabled: false,
                },
                scrollbar: {
                    verticalScrollbarSize: 6,
                    horizontalScrollbarSize: 6,
                },
                ...options,
            }
        }
    />
}
