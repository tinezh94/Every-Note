import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({newNote}) => {
    const [ newNoteContent, setNewNoteContent ] = useState('');
    const [ oldNoteContent, setOldNoteContent ] = useState('');

    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                         // remove formatting button
      ];

    return (
        <ReactQuill
            toolbarOptions={toolbarOptions}
            theme="snow"
            type="text"
            value={newNote === true ? newNoteContent : oldNoteContent}
            onChange={newNote ? value => setNewNoteContent(value) : value => setOldNoteContent(value)}
            >
        </ReactQuill>
    )
}

export default TextEditor;
