import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// const TextEditor = ({
//     newNote,
//     oldNoteContent,
//     newNoteContent,
//     setOldNoteContent,
//     setNewNoteContent
// }) => {
//     // const [ newNoteContent, setNewNoteContent ] = useState('');
//     // const [ oldNoteContent, setOldNoteContent ] = useState('');

//     const toolbarOptions = [
//         ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
//         ['blockquote', 'code-block'],

//         [{ 'header': 1 }, { 'header': 2 }],               // custom button values
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
//         [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
//         [{ 'direction': 'rtl' }],                         // text direction

//         [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

//         [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
//         [{ 'font': [] }],
//         [{ 'align': [] }],

//         ['clean']                                         // remove formatting button
//       ];

//     const quillModules = {
//         toolbar: [
//             [{header: "1"}, {header: "2"}, {header: [3,4,5,6]}, {font: []}],
//             [{size: []}],
//             ["bold", "italic", "underline", "strike", "blockquote"],
//             [{list: "ordered"}, {list: "bullet"}],
//             ["link", "image", "video"],
//             ["clean"],
//             ["code-block"]
//         ]
//     };

//     const [ state, setState ] = ('');
//     // const handleBody = value => {
//     //     setState(value);
//     // }


//    const  onEditorChange = (value, delta, source, editor) => {
//         setState({
//           value: editor.getContents(),
//           events: [`[${source}] text-change`],
//         });
//       }


//     return (
//         <div>
//             <h2>Text Editor</h2>
//             <ReactQuill
//                 name="editor"
//                 toolbarOptions={toolbarOptions}
//                 modules={quillModules}
//                 placeholder="Content area..."
//                 theme="snow"
//                 type="text"
//                 value={state}
//                 // onChange={handleBody}
//                 // value={body}
//                 style={{
//                     minHeight: "450px",
//                     // height: "100%",
//                     // width: "100%",
//                     // outline: "none",
//                   }}
//                 onChange={onEditorChange}
//                 >
//                     {console.log(value => setOldNoteContent(value))}

//             </ReactQuill>
//         </div>
//     )
// }

// export default TextEditor;

// class Editor extends React.Component {
//     constructor (props) {
//       super(props)
//       this.state = { editorHtml: '', theme: 'snow' }
//       this.handleChange = this.handleChange.bind(this)
//     }

//     handleChange (html) {
//         this.setState({ editorHtml: html });
//     }

//     handleThemeChange (newTheme) {
//       if (newTheme === "core") newTheme = null;
//       this.setState({ theme: newTheme })
//     }

//     render () {
//       return (
//         <div>
//           <ReactQuill
//             theme={this.state.theme}
//             onChange={this.handleChange}
//             value={this.state.editorHtml}
//             modules={Editor.modules}
//             formats={Editor.formats}
//             bounds={'.app'}
//             placeholder={this.props.placeholder}
//            />
//           <div className="themeSwitcher">
//             <label>Theme </label>
//             <select onChange={(e) =>
//                 this.handleThemeChange(e.target.value)}>
//               <option value="snow">Snow</option>
//               <option value="bubble">Bubble</option>
//               <option value="core">Core</option>
//             </select>
//           </div>
//          </div>
//        )
//     }
//   }

// Editor.modules = {
//     toolbar: [
//       [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
//       [{size: []}],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{'list': 'ordered'}, {'list': 'bullet'},
//        {'indent': '-1'}, {'indent': '+1'}],
//       ['link', 'image', 'video'],
//       ['clean']
//     ]
// }

// Editor.formats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike', 'blockquote',
//     'list', 'bullet', 'indent',
//     'link', 'image', 'video'
//   ]

//   export default Editor;
