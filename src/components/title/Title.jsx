import { useState, useContext } from 'react';
import { saveItem } from '../../utils/local_storage';
import { PageContext } from '../../App';


const Title = () => {
    const { pages, changePages, name } = useContext(PageContext);
    const [allPages, active] = pages;

    console.log('IN TITLE', 'name', name, 'active', active)
    const [isUpdatingTitle, updatingTitle] = useState(false);
    return (
        <textarea
            readOnly={!isUpdatingTitle}
            defaultValue={name}
            onClick={() => {
                updatingTitle(true);
            }}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    const newPageTitle = e.target.value;
                    const newPage = {
                        [e.target.value]:
                            allPages[active]
                            .map((x, idx) => idx == 1 ? newPageTitle : x)
                    };
                    const { [active]: value, ...allPagesWithOldRemoved } = allPages;
                    const newPages = [{ ...allPagesWithOldRemoved, ...newPage }, newPageTitle];
                    changePages(newPages);
                    saveItem('pages', newPages);
                    updatingTitle(false);
                }
            }}
        />
    )
}

export default Title;