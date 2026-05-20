
module.exports = (options, webpack) => {
  const lazyImports = [
    'mock-aws-s3',
    'aws-sdk',
    'nock',
    '@nestjs/microservices',
    'class-transformer/storage',
    '@nestjs/platform-socket.io',
  ];

  return {
    ...options,
    externals: lazyImports.reduce((acc, imp) => {
      acc[imp] = `commonjs ${imp}`;
      return acc;
    }, {}),
  };
};
