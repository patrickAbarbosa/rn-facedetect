import React, { useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';

import { RNCamera } from 'react-native-camera';

const { width, height } = Dimensions.get('window')


function App() {
  const [faces, setFaces] = useState([])
  const [message, setMessage] = useState(null)

  const handleFace = (props) => {
    if(props && props.faces){
      var message = null
      if(props.faces.length > 0){
        if(props.faces[0].yawAngle > 4)
          message = 'Move face to right'
        else if(props.faces[0].yawAngle < -4)
          message = 'Move face to left'
        else if(props.faces[0].rollAngle > 0.7)
          message = 'Move face to top'
        else if(props.faces[0].rollAngle < -0.7)
          message = 'Move face to down'
      }

      setFaces(props.faces)
      setMessage(message)
    }
  }
 
  return(
    <View style={styles.container}>
      <Text style={styles.title}>My Face Detect</Text>
      <RNCamera
        ref={(ref) => {
          this.camera = ref;
        }}
        style={styles.RNcontainer}
        type={RNCamera.Constants.Type.front}
        onFacesDetected={ res => handleFace(res)}
        faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
      />
      <Text style={styles.peoples}>Peoples: {faces.length}</Text>
      {faces.length > 0 ?
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Horizontal: {faces[0].yawAngle}</Text>
          <Text style={styles.infoText}>Vertical: {faces[0].rollAngle}</Text>
        </View>
        : null
      }
      {message  ?
        <Text style={styles.message}>{message}</Text>
        :
        null
      }
      <Text style={styles.author}>By: Patrick Barbosa</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'red'
  },
  title: {
    fontSize: 30,
    color: '#222'
  },
  RNcontainer: {
    width: '100%',
    height: '90%',
    flex: 1
  },
  peoples: {
    fontSize: 22,
    position: 'absolute',
    bottom: 10, 
    left: 10,
    color: 'red'
  },
  infoContainer: {
    position: 'absolute',
    top: 40, 
    left: 10,
  },
  infoText: {
    fontSize: 22,
    color: 'red'
  },
  message: {
    fontSize: 22,
    position: 'absolute',
    bottom: height * 0.5, 
    left: 10,
    color: 'red'
  },
  author: {
    position: 'absolute',
    bottom: height * 0.3,
    color: 'white',
    fontSize: 30
  },  
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  }
})

export default App