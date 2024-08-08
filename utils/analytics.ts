import ReactGA from 'react-ga';

export const initGA = () => {
    ReactGA.initialize('G-JCQST79BSL'); // Reemplaza con tu ID de seguimiento
};

export const logPageView = (url: string) => {
    ReactGA.set({ page: url });
    ReactGA.pageview(url);   
};

export const logEvent = (category: string, action: string, label?: string, value?: number) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
        value: value
    });
};