// import FlowingMenu from "../ui/FlowingMenu"; // Removed unused import
import LogoImage from "../../../public/images/brand/image.png"
import FlowingMenu from "../ui/FlowingMenu";

const SocialsLinks = () => {
  const socialItems = [
    {
      link: "https://www.instagram.com/kaiknotwear",
      text: "Instagram (Official: @kaiknotwear)",
      image: LogoImage.src,
      description:
        "Follow the official KaiKnot page for drops, updates and the full experience.",
    },
    {
      link: "https://www.instagram.com/kaiknotfound",
      text: "Instagram (BTS: @kaiknotfound)",
      image: LogoImage.src,
      description:
        "Go inside the process. Stories, chaos, experiments and the making of KaiKnot.",
    },
    {
      link: "https://www.pinterest.com/kaiknotwear",
      text: "Pinterest (@kaiknotwear)",
      image: LogoImage.src,
      description:
        "Explore the moodboard that shapes our world. Ideas, textures and the visual language of KaiKnot.",
    },
  ];

  return (
    <div style={{ height: "600px", position: "relative" }}>
      <FlowingMenu items={socialItems} />
    </div>
  );
};

export default SocialsLinks;
