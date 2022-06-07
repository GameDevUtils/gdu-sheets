#!/bin/sh

echo Generating test projects ...

# test new command
echo   Creating test-new-with-images.sheets ...
node ./cli/build/sheets.js new ./_assets/projects/test-new-with-images.sheets "./_assets/sprites/PNG/Characters/platformChar_*.png" --name NewProj --overwrite

# test add command
echo   Creating test-add-with-images.sheets ...
node ./cli/build/sheets.js new ./_assets/projects/test-add-with-images.sheets "./_assets/sprites/PNG/Characters/platformChar_*.png" --name NewProj --overwrite
node ./cli/build/sheets.js add ./_assets/projects/test-add-with-images.sheets "./_assets/sprites/PNG/Tiles/platformPack_tile*.png" --name AddProj --trim-mode Trim --overwrite

# test remove command
echo   Creating test-remove-with-images.sheets ...
node ./cli/build/sheets.js new ./_assets/projects/test-remove-with-images.sheets "./_assets/sprites/PNG/Characters/platformChar_*.png" --name NewProj --overwrite
node ./cli/build/sheets.js add ./_assets/projects/test-remove-with-images.sheets "./_assets/sprites/PNG/Tiles/platformPack_tile*.png" --name AddProj --trim-mode Trim --overwrite
node ./cli/build/sheets.js remove ./_assets/projects/test-remove-with-images.sheets "./_assets/sprites/PNG/Characters/platformChar_walk*.png" --name RemoveProj --overwrite

# test add animated gif
echo   Creating test-add-animated-gif.sheets ...
node ./cli/build/sheets.js new ./_assets/projects/test-add-animated-gif.sheets "./_assets/sprites/PNG/Characters/platformChar_*.png" --name NewProj --overwrite
node ./cli/build/sheets.js add ./_assets/projects/test-add-animated-gif.sheets "./_assets/sprites/PNG/Tiles/platformPack_tile*.png" --name AddProj --trim-mode Trim --overwrite
node ./cli/build/sheets.js remove ./_assets/projects/test-add-animated-gif.sheets "./_assets/sprites/PNG/Characters/platformChar_walk*.png" --name RemoveProj --overwrite
node ./cli/build/sheets.js add ./_assets/projects/test-add-animated-gif.sheets "./_assets/sprites/GIF/walk-cycle.gif" --name AnimGifProj --animated-gif ExtractFrames --overwrite

echo Done.
