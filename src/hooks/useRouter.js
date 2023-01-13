import { useHistory } from 'react-router-dom';
export function useRouter(){
    let history = useHistory();
    return {
        goBack: history.goBack
    }
}