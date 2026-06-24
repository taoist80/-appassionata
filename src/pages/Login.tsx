export default function Login() {
  return (
    // Centered member-login card — placeholder for the My Music Staff portal.
    <div className="max-w-[400px] mx-auto mt-[4vh]">
      <div className="text-center mb-[22px]">
        <img
          src="/images/logo.jpg"
          alt="Appassionata"
          className="w-[58px] h-[58px] rounded-[12px] object-cover bg-white inline-block shadow-[0_4px_14px_rgba(0,0,0,.1)]"
        />
        <h1 className="font-display font-bold text-[2.2rem] text-base-content mt-3.5 mb-0.5">
          Member Login
        </h1>
        <p className="text-[.92rem] text-[#4A4F57] m-0">
          Access your lessons, calendar, and practice resources.
        </p>
      </div>

      <div className="card rounded-[18px] border border-base-300 bg-base-100 p-[26px] shadow-[0_12px_30px_rgba(0,0,0,.06)]">
        <form onSubmit={(e) => e.preventDefault()}>
          <label className="text-[.82rem] text-[#4A4F57] font-semibold">
            Email
            <input
              type="email"
              placeholder="you@email.com"
              className="input w-full mt-1.5 mb-3.5 font-sans"
            />
          </label>
          <label className="text-[.82rem] text-[#4A4F57] font-semibold">
            Password
            <input
              type="password"
              placeholder="••••••••"
              className="input w-full mt-1.5 mb-1.5 font-sans"
            />
          </label>
          <div className="text-right mb-4">
            <a
              href="#"
              className="text-[.82rem] text-primary no-underline font-semibold hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <button
            type="submit"
            className="btn btn-secondary rounded-full w-full font-bold"
          >
            Sign in
          </button>
        </form>
      </div>

      <p className="text-[.8rem] text-[#9aa0a8] text-center mt-[18px]">
        Secure member portal powered by My Music Staff.
      </p>
    </div>
  );
}
