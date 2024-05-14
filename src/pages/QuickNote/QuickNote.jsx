import { useContext } from 'react';

import { PageContext } from '../../App';
import styles from './QuickNote.module.css';

import Comments from '../../components/comments/Comments';

import { component_type_map } from '../../utils/maps';
import AddComment from '../../components/comments/AddComment';
import Header from '../../components/title/Header';

const QuickNote = ({comments}) => {   
    const {currentPageId} = useContext(PageContext);
    
    return (
        <div>
            <Header canEdit={true} isTruncated={false}/>

            <Comments comments={comments}/>
            <AddComment 
                componentType={component_type_map['page']}
                componentId={currentPageId} />
  
            <div>
                Todo placeholder. Lorem ipsum.
            </div>
        </div>
    )
}

export default QuickNote;