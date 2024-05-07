import { useContext } from 'react';

import { PageContext } from '../../App';
import styles from './QuickNote.module.css';

import Comments from '../../components/comments/Comments';

import { entity_type_map } from '../../utils/maps';
import AddComment from '../../components/comments/AddComment';
import Header from '../../components/title/Header';

const QuickNote = ({comments}) => {   
    const {currentPageId} = useContext(PageContext);
    
    return (
        <div>
            <Header />

            <Comments comments={comments}/>
            <AddComment 
                entityType={entity_type_map['page']}
                entityId={currentPageId} />
  
            <div>
                Todo placeholder. Lorem ipsum.
            </div>
        </div>
    )
}

export default QuickNote;