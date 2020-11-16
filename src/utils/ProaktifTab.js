/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

/**
 * Tabs elemanları her biri 3 ayrı parametresi olmak zorunda
 * id:string:{
 *  id:string,
 *  buttonText: string,
 *  content: html 
 * }
 * 
 * örnek:
 * {
 *  tab1:{
 * id="tab1",
 * buttonText="Tab 1",
 * content="<p>tab 1 içerik</p>"
 * },
 * tab2:{
 * id:"tab2",
 * buttonText="Tab 2",
 * content="<p>tab 2 content"</p>"
 * }
 * }
 */
const ProaktifTab = ({ tabs }) => {
    const [content, setContent] = useState("");//props.tabs[Object.keys(props.tabs)[0]].content);
    const [activeLink, setActiveLink] = useState(tabs[Object.keys(tabs)[0]].id);

    useEffect(() => {
        setContent(tabs[activeLink].content);
    }, [activeLink])

    const TabButtons = Object.keys(tabs).map((tab) => {
        return (<button key={tabs[tab].id} className={`tablinks ${activeLink === tabs[tab].id && "active"}`} onClick={(e) => setActiveLink(tabs[tab].id)}>{tabs[tab].buttonText}</button>);
    })

    return (
        <>
            <div className="proaktif-tab">
                <div className="proaktif-tab-buttons">
                    {TabButtons}
                </div>
                <div className="proaktif-tab-content" dangerouslySetInnerHTML={{ __html: content }} style={{textAlign:"left", fontSize:"15px"}}>
                </div>
            </div>
        </>
    );
}

export default ProaktifTab;