import { Title, Column } from '@theme/global';
import { CheckCircle, CheckIcon } from "lucide-react-native";

const Success = ({ msg }) => {
    return (
        <Column style={{ alignItems: 'center', marginVertical: 12, paddingVertical: 14, paddingHorizontal: 8, borderRadius: 6, backgroundColor: '#00A3FF', flexDirection: 'row' }}>
            <Column style={{ width: 32, height: 32, backgroundColor: '#ffffff40', borderRadius: 100, justifyContent: 'center', alignItems: 'center', }}>
                <CheckIcon size={18} color="#fff" />
            </Column>
            <Title style={{ fontSize: 14, marginLeft: 12, color: '#fff', textAlign: 'center', }}>{msg}</Title>
        </Column>
    )
}
export default Success;