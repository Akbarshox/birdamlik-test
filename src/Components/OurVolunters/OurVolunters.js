import React, { useEffect, useState } from "react";
import Aux from '../../hoc/Wrapper';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import style from './OurVolunters.module.css';
import translations from '../../Translation.json'
import axios from '../../API/api'
import userImg from '../../assets/icons/user.svg'
import Showmore from '../UI/ShowMore/ShowMore.js'
import Snackbar from '../UI/Snackbar/Snackbar';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Alert from '@material-ui/lab/Alert';

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
    partialVisibilityGutter: 0
    
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4, 
    partialVisibilityGutter: 40   
  },
 
  tablet: {
    breakpoint: { max: 1024, min: 960 },
    items: 4,
    partialVisibilityGutter:  30   
  },
  medium:{
    breakpoint: { max: 960, min: 540 },
    items: 3, 
    partialVisibilityGutter: 20
  },
  small:{
    breakpoint: { max: 540, min: 320 },
    items: 2, 
    partialVisibilityGutter: 20
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 20
    
  }
};
function OurVolunters(props) {
  const [lang, setLang] = useState(props.match.params.lang ? props.match.params.lang : 'ru')
  const [volunteers, setList] = useState(null)
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const { deviceType } = props;
  useEffect(() => {
    setLang(props.match.params.lang ? props.match.params.lang : 'ru')
    if (!volunteers) {
      axios.get(`/misc/landing/`)
        .then(res => {
          let data = res.data.volunteers ? res.data.volunteers : [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].avatar) {
              if (!(data[i].avatar).includes('https://api.birdamlik.uz'))
                data[i].avatar = `https://api.birdamlik.uz${data[i].avatar}`
            }
            else
              data[i].avatar = userImg
          }
          setList(data);
        })
        .catch(err => {
          setMessage(err.message);
          setError(true)
        })
    }
  }, [props.match.params.lang]);


  const handleError = () => {
    setError(true)
  }
  const handleClose = () => {

    setError(false)
  };

  const list = volunteers ? volunteers.map((data) => {
    return (<div key={data.id} >
      <img src={data.avatar} className={style.ava} />
      <h3 className={style.name}>{data.fio}</h3>
      <p className={style.title}>{translations.volunteer[lang]}</p>
      <Showmore {...props}>
        <p className={style.bio}>{data.about}</p>
      </Showmore>
      {/* <Button btnType="Grey">
            Связаться
      </Button> */}
    </div>)
  }) : ''
  return (
    <Aux>

      <Container maxWidth="lg">
        <Grid container justify="center">
          <Grid item xl={6} lg={6} md={8} sm={12} xs={12} >
            <div className={style.OurVolunters}>
              <h1>{translations.ourVolunteers[lang]}</h1>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={style.bgImage}>
        <Container maxWidth="lg">
          <Grid container justify="center">
            <Grid item xl={6} lg={6} md={8} sm={12} xs={12} >
              <div>
                <p className={style.abbr}>{translations.herosface[lang]}</p>
              </div>
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={4} style={{ marginBottom: '50px' }}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12} >
              {
                volunteers && volunteers.length ?
                    <Carousel responsive={responsive}
                    additionalTransfrom={0}
                    arrows={false}
                    autoPlaySpeed={3000}
                    centerMode={false}
                    className=""
                    containerClass="container"
                    dotListClass=""
                    draggable
                    focusOnSelect={false}
                    infinite
                    itemClass={style.card}
                    keyBoardControl
                    deviceType={deviceType}
                    minimumTouchDrag={80}
                    renderButtonGroupOutside={false}
                    renderDotsOutside={false}
                    showDots={false}
                    sliderClass={style.slider}
                    slidesToSlide={1}
                    swipeable
                    ssr={true}
                    >
                      {list}
                    </Carousel>
                  : ' '}
            </Grid>
          </Grid>
        </Container >
      </div >
      <Snackbar open={error} handleOpen={handleError} handleClose={handleClose}>
        <Alert elevation={6} variant="filled" onClose={handleClose} severity="error">{translations.error[lang]}</Alert>
      </Snackbar>
    </Aux >
  );
}
export default OurVolunters;