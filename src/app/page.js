import ChatBox from "./Chat/ChatBox";
import Header from "./Chat/Header";
import LandingPage from "./Chat/LandingPage";

export default function Home() {
  return (
    <>
      <div className="min-h-screen bg-black font-Alkatra">
        <section>
          <LandingPage />
        </section>
      </div>
    </>
  );
}
