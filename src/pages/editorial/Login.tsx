import Seo from "../../components/Seo";
import MmsWidget from "../../components/MmsWidget";

export default function EditorialLogin() {
  return (
    <div className="max-w-[400px] mx-auto">
      <Seo path="/login" noindex />
      <div className="text-center mb-7">
        <h1 className="font-editorial font-semibold text-[2.6rem] text-[#1F2227] tracking-[-.01em] mb-2">
          Member Login
        </h1>
        <p className="font-editorial text-[1.08rem] text-[#6b5358] m-0">
          Access your lessons, calendar, and practice resources.
        </p>
      </div>
      <MmsWidget block="login" useOfficialLoginScript minHeight={360} />
      <p className="font-sans text-[.78rem] text-[#a99f95] text-center mt-5">
        Secure member portal powered by My Music Staff.
      </p>
    </div>
  );
}
