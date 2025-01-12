import React from 'react'
import { Descendant, Editor, Node, Scrubber } from 'slate'
import { SlateContextValue } from '../hooks/use-slate'
import { ReactEditor } from '../plugin/react-editor'

import { Provider } from './provider'

export const Slate = (props: {
  editor: ReactEditor
  initialValue: Descendant[]
  children: React.ReactNode
  onChange?: (value: Descendant[]) => void
}) => {
  const { editor, children, onChange, initialValue, ...rest } = props

  const [context, setContext] = React.useState<SlateContextValue>(() => {
    if (!Node.isNodeList(initialValue)) {
      throw new Error(
        `[Slate] initialValue is invalid! Expected a list of elements but got: ${Scrubber.stringify(
          initialValue
        )}`
      )
    }
    if (!Editor.isEditor(editor)) {
      throw new Error(
        `[Slate] editor is invalid! You passed: ${Scrubber.stringify(editor)}`
      )
    }
    editor.children = initialValue
    Object.assign(editor, rest)
    return { v: 0, editor }
  })

  return (
    <Provider
      editor={editor}
      context={context}
      onChange={onChange}
      children={children}
      setContext={setContext}
    />
  )
}
