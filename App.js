import * as React from 'react';
import {Text,View,TouchableOpacity,Image} from 'react-native';
import * as Permissions from 'expo-permissions';
import {BarCodeScanner} from 'expo-barcode-scanner';

export default class App extends React.Component{
  constructor(){
    super();
    this.state={
      scanned:false,
      scannedData:'',
      hasCameraPermissions:null,
      buttonState:'normal'
    }
  }
  getCameraPermissions=async()=>{
    const {status}=await Permissions.askAsync(Permissions.CAMERA);
    this.setState={
      hasCameraPermissions:status ==="granted",
      scanned:false,
      buttonState:'clicked'
    }
  }
  handleBarcodeScanner=async(type,data)=>{
    this.setState={
      scanned:true,
      scannedData:data,
      buttonState:'normal'
    }
  }
  render(){
    const hasCameraPermissions=this.state.hasCameraPermissions;
    const scanned=this.state.scanned;
    const buttonState=this.state.buttonState;
    const scannedData=this.state.scannedData;
    
    if(hasCameraPermissions&&buttonState==='clicked'){
      return(
        <BarCodeScanner
          onBarCodeScanned={scanned?undefined:this.handleBarcodeScanner}/>
      )
    }
    else if(buttonState === 'normal'){
      return(
        <View>
          <Image source={require('./Scanner.jpg')}/>
          <Text>Request Camera Permission</Text>
          <TouchableOpacity onPress={this.getCameraPermissions} title="Bar Code Scanner">
            <Text>Scan Barcode</Text>
          </TouchableOpacity>
           
        </View>
      )
    }
  }
}