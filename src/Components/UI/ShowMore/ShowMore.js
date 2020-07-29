import React, { useState, useEffect } from 'react';
import ShowMoreText from 'react-show-more-text';
import styles from './Showmore.module.css'
import translations from '../../../Translation.json'

export default function ExpandText(props) {
    let params = '';
    if(props.matchParams){
        params = props.matchParams
    }
    else{
        params =  props.match.params
    }
    const [lang, setLang] = useState(params.lang ? params.lang : 'ru')
    useEffect(() => {
      setLang(params.lang ? params.lang : 'ru')
    }, [params.lang]);

    const executeOnClick = (isExpanded) => {
    }

    return (
        <div className={[styles.text, styles[props.moreType]].join(' ')}>
            <ShowMoreText
                lines={4}
                more={translations.showmore[lang]}
                less={translations.showless[lang]}
                anchorClass={styles.AnchorClass}
                onClick={executeOnClick}
                expanded={false}
            >
                {props.children}
            </ShowMoreText>
        </div>
    );

}