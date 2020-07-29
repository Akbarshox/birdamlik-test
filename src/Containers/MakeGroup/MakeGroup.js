import React, { useEffect, useState } from "react";
import Aux from '../../hoc/Wrapper'
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import MakeGroupForm from '../../Components/Form/MakeGroup';
import { appbarData } from "../Profile/AppbarJsonData";
import translations from "../../Translation.json"
import Appbar from '../../Components/Appbar/Appbar'



function MakeGroup(props) {
  // const { classes } = props;
  const [content, setContent] = useState(null);
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')

  useEffect(() => {
    setLang(props.match.params.lang ? props.match.params.lang : 'ru')
  }, [props.match.params.lang]);
  const appbarData = [
    {
      css: "Simple",
      link: 'groups',
      scroll: '',
      name: {
        en: "Back",
        ru: "Назад",
        uz: "Ortga"
      },
      icon1: null,
      icon2: null,
    }
  ];
  return (
    <Aux>
      <Appbar json={appbarData} {...props} />
      <Container maxWidth="lg" >
        <Grid container spacing={4} justify="center" style={{ marginTop: '50px' }}>
          <h1>{translations.creategroup[lang]}</h1>
        </Grid>
        <Grid container spacing={4} justify="center" style={{ marginTop: '10px' }}>
          <MakeGroupForm {...props} />
        </Grid>
      </Container>
    </Aux>
  );
}
export default MakeGroup;