module.exports = {
  plugins: [
    {
      rules: {
        main: ({ raw }) => {
          const format =
            "#<issue-number><space>|<space><name><space>|<space><conventional-commit-message>";
          const title = "COMMIT MESSAGE'S FORMAT";
          const description = "Please use the following format:";
          const rightFormat = "#123 | Jhon Doe | chore: some commit message";

          const regex =
            /#\d+\s\|\s\w+\s\|\s(?<type>build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test|BREAKING CHANGE)(?<scope>(?:\([^()\r\n]*\)|\())?(?<breaking>!)?(?<separator>:)? ?(?<subject>.+$)?/;
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
  rules: { main: [2, "always"] },
};
