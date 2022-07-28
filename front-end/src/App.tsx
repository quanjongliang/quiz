// routing
import Routes from 'routes';

// project imports
import Locales from 'components/Locales';
import NavigationScroll from 'core/layout/NavigationScroll';
import RTLLayout from 'components/RTLLayout';
import Snackbar from 'components/extended/Snackbar';
import ThemeCustomization from 'core/themes';

// auth provider
import { FirebaseProvider as AuthProvider } from 'services/contexts/FirebaseContext';
import * as React from 'react';
import { ViewUIManager } from 'core/UIManager';

// import { AWSCognitoProvider as AuthProvider } from 'contexts/AWSCognitoContext';
// import { JWTProvider as AuthProvider } from 'contexts/JWTContext';
// import { Auth0Provider as AuthProvider } from 'contexts/Auth0Context';

// ==============================|| APP ||============================== //

const App = () => {
    return (
        <ThemeCustomization>
            {/* RTL layout */}
            <RTLLayout>
                <Locales>
                    <NavigationScroll>
                        <AuthProvider>
                            <>
                                <Routes />
                                <Snackbar />
                                <ViewUIManager />
                            </>
                        </AuthProvider>
                    </NavigationScroll>
                </Locales>
            </RTLLayout>
        </ThemeCustomization>
    );
};

export default App;
