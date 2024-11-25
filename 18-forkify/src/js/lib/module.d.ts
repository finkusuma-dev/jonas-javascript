/// add HMR types to NodeModule, which is the interface for module.
interface NodeModule {
  hot: {
    accept(): void;
  };
}
