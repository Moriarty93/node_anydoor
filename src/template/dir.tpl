<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>{{title}}</title>
  <style>
    body {
      padding: 30px;
    }
    a {
      display: block;
      padding: 5px;
      font-size: 20px;
      line-height: 1;
    }
  </style>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{file}}">【{{icon}}】{{file}}</a>
  {{/each}}
</body>
</html>
