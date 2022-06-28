// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useParams } from 'react-router-dom';
// import { getNotebooksThunk, getOneNotebookThunk } from '../../store/notebooks';
// import EditNotebook from '../EditNotebookModal/EditNotebook';

// const NotebobookDetailPage = ( {allNotebooks, sessionUser }) => {
//     const dispatch = useDispatch();
//     const { notebookId } = useParams();
//     console.log(notebookId)
//     // const currentSessionId = sessionUser.id;
//     const notebook = allNotebooks[notebookId];

//     useEffect(() => {
//         dispatch(getNotebooksThunk(sessionUser.id));
//         // dispatch(getOneNotebookThunk(notebookId));
//     }, [dispatch]);

//     return (
//         <>
//           {notebook && (
//             <div>
//                 <h1>{notebook.name}</h1>
//                 <button >Rename Notebook</button>
//             </div>
//             )}
//         </>
//     )
// }

// export default NotebobookDetailPage;
