// get gender specific based on state
[
  {
    $match: {
      gender: "female",
    },
  },
  {
    $group: {
      _id: {
        state: "$location.state",
      },
      totalPersons: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      totalPersons: -1,
    },
  },
];

// Project operator select fields and transform full name
[
  {
    $project: {
      _id: 0,
      gender: 1,
      fullName: {
        $concat: [
          {
            $toUpper: {
              $substrCP: ["$name.first", 0, 1],
            },
          },
          {
            $substrCP: [
              "$name.first",
              1,
              {
                $subtract: [
                  {
                    $strLenCP: "$name.first",
                  },
                  1,
                ],
              },
            ],
          },
          " ",
          {
            $toUpper: {
              $substrCP: ["$name.last", 0, 1],
            },
          },
          {
            $substrCP: [
              "$name.last",
              1,
              {
                $subtract: [
                  {
                    $strLenCP: "$name.last",
                  },
                  1,
                ],
              },
            ],
          },
        ],
      },
    },
  },
];
