import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export async function GET(request: Request) {
  let url = new URL(request.url);
  let title = url.searchParams.get("title");

  const instrumentSerifResponse = await fetch(
    "https://fonts.googleapis.com/css2?family=Instrument+Serif:wght@400&display=swap"
  );
  const instrumentSerifCss = await instrumentSerifResponse.text();
  const instrumentSerifUrl = instrumentSerifCss.match(/url\(([^)]+)\)/)?.[1];

  const instrumentSerif = await fetch(instrumentSerifUrl!).then((res) =>
    res.arrayBuffer()
  );

  const geistMono = await readFile(
    join(
      process.cwd(),
      "node_modules/geist/dist/fonts/geist-mono/GeistMono-Regular.ttf"
    )
  );

  return new ImageResponse(
    (
      <div tw="relative flex flex-col w-full h-full items-center justify-center bg-black text-white">
        <img
          src={`${process.env.NEXT_PUBLIC_BASE_URL}/img/mesh-gradiant.png`}
          alt="Test"
          width={1200}
          height={630}
          tw="absolute top-0 left-0 z-0 opacity-50"
        />
        {title ? (
          <div tw="relative z-10 flex flex-col w-full py-12 px-4 items-center max-w-3xl justify-center p-8">
            <h1
              tw="flex flex-col text-7xl tracking-tight text-center items-center justify-center w-full my-2"
              style={{ fontFamily: "Instrument Serif" }}
            >
              {title}
            </h1>
            <h2
              tw="flex flex-col text-2xl tracking-tight text-center items-center justify-center w-full text-neutral-400 my-2"
              style={{ fontFamily: "Geist Mono" }}
            >
              by Adam Chambers
            </h2>
          </div>
        ) : (
          <div tw="relative z-10 flex flex-col w-full py-12 px-4 gap-0 items-center justify-center p-8">
            <h1
              tw="flex flex-col text-8xl tracking-tight text-center items-center justify-center w-full my-2"
              style={{ fontFamily: "Instrument Serif" }}
            >
              Adam Chambers
            </h1>
            <h2
              tw="flex flex-col text-2xl tracking-tight text-center items-center justify-center w-full text-neutral-400 my-2"
              style={{ fontFamily: "Geist Mono" }}
            >
              Product engineer, ux strategist, creative technologist.
            </h2>
          </div>
        )}
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Instrument Serif",
          data: instrumentSerif,
          style: "normal",
          weight: 400,
        },
        {
          name: "Geist Mono",
          data: geistMono,
          style: "normal",
          weight: 400,
        },
      ],
    }
  );
}
