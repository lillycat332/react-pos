let
  pkgs = import <nixpkgs> {};
  stdenv = pkgs.llvmPackages_13.stdenv;
in

pkgs.mkShell {
  buildInputs = with pkgs; [     
    yarn
    nodejs
    deno
  ];
}
  
