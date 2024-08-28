import { CameraView, useCameraPermissions } from 'expo-camera';
import { useState, useRef } from 'react';
import { Row, Column, Button, Title, SCREEN_HEIGHT, SCREEN_WIDTH, useTheme, ButtonPrimary, Label, Image, } from '@theme/global';
import { RefreshCcw, Image as ImageIcon, X, Check } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Haptics from 'expo-haptics';
import { enviarImage } from '@api/request/chat';

const CameraChat = ({ setopenCamera, modalCamera, token, user, }) => {
    const { color, font, margin } = useTheme();
    const [facing, setFacing] = useState('back');
    const [permission, requestPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [picture, setPicture] = useState(null);
    const [image, setimage] = useState();

    if (!permission?.granted) {
        return (
            <Column mv={150} mh={50} style={{ justifyContent: 'center', alignItems: 'center',  }}>
                <Image source={require('@imgs/onboarding_1.png')} style={{ width: 160, height: 160, borderRadius: 12, marginVertical: 12, }}/>
                <Title align="center" style={{ marginVertical: 12, }}>Você precisa dar permissão {'\n'}para usar a camera</Title>
                <Label align="center">Isso permite que você envie as fotos solicitadas para o aplicativo.</Label>
                <ButtonPrimary onPress={requestPermission} label="Permitir" mv={20}/>
            </Column>
        );
    }

    function toggleCameraFacing() {
        setFacing(current => (current === 'back' ? 'front' : 'back'));
    }

    const takePicture = async () => {
        if (cameraRef.current) {
            const photo = await cameraRef.current.takePictureAsync();
            setPicture(photo.uri);

            console.log(photo);
        }
    }

    const openLibrary = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            quality: 1,
            base64: true,
        });
        if (!result.canceled) {
            setimage(result.assets[0].base64);
            setPicture(result.assets[0].uri);
        }
    }

    const sendPicture = () => {
        if (picture) {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
            const params = {
                token: token,
                user: user,
                image: image,
            }
            enviarImage(params)
            setopenCamera(false);
            modalCamera.current.close();
        }
    }

    return (
        <Column style={{ height: SCREEN_HEIGHT - 180,  borderRadius: 32, overflow: 'hidden', marginHorizontal: 12, }}>
            {picture ? (
                <Column style={{ backgroundColor: '#fff', flex: 1, }}>
                    <Image source={{ uri: picture }} style={{ width: SCREEN_WIDTH, height: SCREEN_HEIGHT - 50, }} contentFit='contain' />
                    <Row style={{ position: 'absolute', bottom: 20, alignItems: 'center', justifyContent: 'space-between', alignSelf: 'center', columnGap: 12 }}>
                        <Button ph={1} pv={1} radius={100} onPress={() => { setopenCamera(false); modalCamera.current.close(); }} style={{}}>
                            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#a60a0a', borderRadius: 100, }}>
                                <Column style={{ width: 56, height: 56, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: color.red, }}>
                                    <X size={24} color="#fff" />
                                </Column>
                                <Title style={{ color: '#fff', marginLeft: 12, fontSize: 18, marginRight: 24, }}>Excluir</Title>
                            </Row>
                        </Button>
                        <Button ph={1} pv={1} radius={100} onPress={sendPicture} >
                            <Row style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#2aa168', borderRadius: 100, }}>
                                <Column style={{ width: 56, height: 56, borderRadius: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: color.green, }}>
                                    <Check size={24} color="#fff" />
                                </Column>
                                <Title style={{ color: '#fff', marginLeft: 12, fontSize: 18, marginRight: 24, }}>Enviar</Title>
                            </Row>
                        </Button>
                    </Row>
                </Column>
            ) : (
                <CameraView style={{ flex: 1,}} facing={facing} ref={cameraRef}>
                    <Column style={{ flex: 1, }}>
                        <Button ph={0} pv={0} radius={100} bg={"#30303090"} onPress={() => {
                            setopenCamera(false); setTimeout(() => {
                                modalCamera.current.close()
                            }, 200);
                        }} style={{ width: 56, position: 'absolute', top: 20, right: 20, height: 56, justifyContent: 'center', alignItems: 'center', }}>
                            <X size={24} color="#fff" />
                        </Button>
                        <Row style={{ justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 28, position: 'absolute', bottom: 28, width: '100%' }}>
                            <Button onPress={openLibrary} ph={0} pv={0} radius={100} bg={"#30303090"} style={{ width: 56, height: 56, justifyContent: 'center', alignItems: 'center', }}>
                                <ImageIcon size={24} color="#fff" />
                            </Button>
                            <Column style={{ borderWidth: 2, borderColor: "#fff", borderRadius: 100, }}>
                                <Button ph={0} pv={0} radius={100} bg={"#fff"} onPress={takePicture} style={{ width: 64, margin: 6, height: 64, justifyContent: 'center', alignItems: 'center', }}>
                                    <Column></Column>
                                </Button>
                            </Column>
                            <Button ph={0} pv={0} radius={100} bg={"#30303090"} onPress={toggleCameraFacing} style={{ width: 56, height: 56, justifyContent: 'center', alignItems: 'center', }}>
                                <RefreshCcw size={24} color="#fff" />
                            </Button>
                        </Row>
                    </Column>
                </CameraView>)
            }
        </Column >
    );
}
export default CameraChat;
