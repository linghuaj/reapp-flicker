import { Reapp, React, View, Button, Input, Gallery} from 'reapp-kit'
import Superagent from 'superagent';

//DO NOT COPY MY KEY, Thanks :)
const key = '415b05c962448acbef9d99d4ea530aa9';
const base = `https://api.flickr.com/services/rest/?api_key=${key}&
format=rest&format=json&nojsoncallback=1`;


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {photos: []}
  }

  handleSearch(e) {
    let self = this
    //  in render, <Input ref="search"> so it could be referended
    let searchText = this.refs.search.getDOMNode().value;
    let searchUrl = `${base}&method=flickr.photos.search&text=${searchText}
    &per_page=10&page=1`
    console.log(">< searchUrl", searchUrl)

    Superagent
    .get(`${base}&method=flickr.photos.search&text=${searchText}&per_page=10&page=1`)
    .end(function(err, res){
      if (! (res.status === 200 && res.body.photos)) return;
      // Calling the end function will send the request
      self.setState({
        photos: res.body.photos.photo.map(function(image){
          return `https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`;
        })
      });


    })
  }

  render() {
    let { photos } = this.state;
    return (
      <View title="reapp-flicker">
        <Input ref="search" placeholder="Enter your search" styles={{
            input: {
              margin: '0 0 10px 0'
            }
          }} />
          <Button onTap={this.handleSearch.bind(this)}>Search Images</Button>
          <div className="verticalCenter">
            {!photos.length && <p>No photos!</p>}
            {!!photos.length &&
              <Gallery
                onClose={() => this.setState({ photos: [] })}
                images={photos}
                width={window.innerWidth}
                height={window.innerHeight - 44}
                />
            }
          </div>
        </View>
      )
    }
  }

  export default Reapp(App)
