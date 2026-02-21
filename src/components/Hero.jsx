import heroAd from "../assets/videos/ad.mp4";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src={heroAd}
        autoPlay
        muted
        loop
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="relative z-10 flex items-center justify-center h-full bg-black/40">
        <h1 className="text-white text-4xl font-bold"><Link to="/sell">Your Ad Here</Link>
        </h1>
      </div>
    </section>
  );
}