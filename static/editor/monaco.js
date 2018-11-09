// Monaco editor core files path
require.config({ paths: { 'vs': '/static/node_modules/monaco-editor/min/vs' }})

// A global reference to the editor
let editor = null

// Each editor must have a specific name
// It will be used to post messages back to the parent window
let name = null

// listen to messages form parent window
window.addEventListener('message', onMessage, false)

function onMessage(event) {
  // if the meesage arrives before the editor is ready, retry a bit later
  if (!editor) {
    setTimeout(() => onMessage(event), 100)
    return
  }
  
  // console.log('income', event)
  
  const { type, value } = event.data
  switch (type) {
    case 'setName':
      name = value
      break;
    case 'setLanguage':
      monaco.editor.setModelLanguage(editor.getModel(), value)
      break;
    case 'setValue':
      editor.setValue(value)
      break;
    case 'setReadOnly':
      editor.updateOptions({ readOnly: value })
      break;
  
    default:
      throw new Error(`Message type \`type\` is not known.`)
      break;
  }
}

// init
require(['vs/editor/editor.main'], function() {
  monaco.editor.defineTheme('teleport', {
    base: 'vs-dark', // can also be vs-dark or hc-black
    inherit: true, // can also be false to completely replace the builtin rules
    rules: [
      { token: 'comment', foreground: 'a5a5a5', fontStyle: 'italic underline' },
      { token: 'comment.js', foreground: '57606C', fontStyle: 'bold'},
      { token: 'string.js', foreground: '82B977', fontStyle: 'bold' },
      { token: 'keyword.js', foreground: 'C36BC5', fontStyle: 'bold' },
      { token: 'identifier.js', foreground: 'AF4E5A', fontStyle: 'bold' },
      { token: 'comment.css', foreground: '0000ff' } // will inherit fontStyle from `comment` above
    ]
  });

  editor = monaco.editor.create(document.getElementById('editor'), {
    language: 'json',
    theme: 'vs-dark',
    minimap: {
      enabled: false
    },
    automaticLayout: true
  })

  editor.getModel().updateOptions({ tabSize: 2 })

  // monaco.languages.typescript.javascriptDefaults.addExtraLib(
  //   [definitions.TeleportProject].join('\n')
  // )

  editor.model.onDidChangeContent((event) => {
    // console.log('event', name)
    try {
      // console.log(window.parent.editors[name])
      window.parent.editors[name].post({
        event: 'onDidChangeContent',
        value: editor.getValue(),
        event
      })
    } catch (error) {
      console.log(error)
    }
    
  })
})




