import { useContext } from 'react';
import { ConfigContext } from 'services/contexts/ConfigContext';

// ==============================|| CONFIG - HOOKS  ||============================== //

const useConfig = () => useContext(ConfigContext);

export default useConfig;
