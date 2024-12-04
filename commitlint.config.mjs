export default {
  rules: { kominfo: [2, "always"] },
  plugins: [
    {
      rules: {
        kominfo: ({ raw }) => {
          const format =
            "#<nomer-issue><spasi>|<spasi><nama><spasi>|<spasi><commit-message>";
          const title = "FORMAT COMMIT KOMINFO PEMUDA PERSIS";
          const description = "Format message yang benar";
          const rightFormat = "#400 | Jhon Doe | contoh commit";

          const regex = /#\d+\s\|\s[\w\s]+\s\|\s.+/;
          if (!raw.match(regex))
            return [
              false,
              `\n${title}\n\n${description} ${format}\n${rightFormat}`,
            ];
          return [true, ""];
        },
      },
    },
  ],
};
