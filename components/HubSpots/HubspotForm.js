import Helmet from 'react-helmet';

const HubSpotForm = () => {
    const embedCode = `<script type="text/javascript" id="hs-script-loader" async defer src="//js-na1.hs-scripts.com/45377115.js"></script>
        `;

    return (
        <>
            <Helmet>
                <script dangerouslySetInnerHTML={{ __html: embedCode }} />
            </Helmet>
        </>
    );
};

export default HubSpotForm;