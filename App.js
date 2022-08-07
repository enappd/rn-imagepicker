/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Fragment, Component, useState } from 'react';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  Button,
  Dimensions,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';




export default App = () => {

  const [fileData, setFileData] = useState();
  const [fileUri, setFileUri] = useState();

  const renderFileData = () => {
    if (fileData) {
      return <Image source={{ uri: 'data:image/jpeg;base64,' + fileData }}
        style={styles.images}
      />
    } else {
      return <Image source={require('./assets/dummy.png')}
        style={styles.images}
      />
    }
  }

  const renderFileUri = () => {
    if (fileUri) {
      return <Image
        source={{ uri: fileUri }}
        style={styles.images}
      />
    } else {
      return <Image
        source={require('./assets/galeryImages.jpeg')}
        style={styles.images}
      />
    }
  }

  const nativeLaunchCamera = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = { uri: response.uri };
        console.log('response', JSON.stringify(response));
        setFileData(response.data)
        setFileUri(response.uri)
      }
    });
  }


  const nativeLaunchImageLibrary = async () => {
    let options = {
      mediaType: 'photo',
      quality: 0
    };
    await launchImageLibrary(options, (response) => {
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets.uri };
        console.log('response', JSON.stringify(response));
        setFileData(response.assets)
        setFileUri(response.assets.uri)
      }
    });
  }

  return (
    <Fragment>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View style={styles.body}>
            <Text style={{textAlign:'center',fontSize:20,paddingBottom:10}} >Pick Images from Camera & Gallery</Text>
            <View style={styles.ImageSections}>
              <View>
                {renderFileData()}
                <Text  style={{textAlign:'center'}}>Base 64 String</Text>
              </View>
              <View>
                {renderFileUri()}
                <Text style={{textAlign:'center'}}>File Uri</Text>
              </View>
            </View>

            <View style={styles.btnParentSection}>
              {/* <TouchableOpacity onPress={() => {chooseImage()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Choose File</Text>
              </TouchableOpacity> */}

              <TouchableOpacity onPress={() => {nativeLaunchCamera()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Camera</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => {nativeLaunchImageLibrary()}} style={styles.btnSection}  >
                <Text style={styles.btnText}>Directly Launch Image Library</Text>
              </TouchableOpacity>
            </View>

          </View>
        </SafeAreaView>
      </Fragment>
  )
}


const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },

  body: {
    backgroundColor: Colors.white,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 1,
    height: Dimensions.get('screen').height - 20,
    width: Dimensions.get('screen').width
  },
  ImageSections: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 8,
    justifyContent: 'center'
  },
  images: {
    width: 150,
    height: 150,
    borderColor: 'black',
    borderWidth: 1,
    marginHorizontal: 3
  },
  btnParentSection: {
    alignItems: 'center',
    marginTop:10
  },
  btnSection: {
    width: 225,
    height: 50,
    backgroundColor: '#DCDCDC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    marginBottom:10
  },
  btnText: {
    textAlign: 'center',
    color: 'gray',
    fontSize: 14,
    fontWeight:'bold'
  }
});


