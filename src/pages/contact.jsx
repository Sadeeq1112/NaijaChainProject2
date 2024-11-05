import SEO from "@components/seo";
import Wrapper from "@layout/wrapper";
import Header from "@layout/header/header-01";
import Footer from "@layout/footer/footer-01";
import Breadcrumb from "@components/breadcrumb";
import ContactTopArea from "@containers/contact-top";
import ContactFormArea from "@containers/contact-form";

export async function getStaticProps() {
    return { props: { className: "template-color-1" } };
}

const Contact = () => (
    <Wrapper>
        <SEO pageTitle="Contact" />
        <Header />
        <main id="main-content">
            <Breadcrumb
                pageTitle="Contact With Us"
                currentPage="Contact With Us"
            />
            <ContactTopArea />
            <ContactFormArea />
        </main>
        <Footer />
    </Wrapper>
);

export default Contact;
