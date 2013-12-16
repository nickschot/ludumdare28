var tileTypes = {
    '00ff00': {
        'type': 'grass',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 1,
        'y': 3
    },
    '000000': {
        'type': 'mountain',
        'wall': true,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 0,
        'y': 0
    },
    'ffff00': {
        'type': 'path_vertical',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 1,
        'y': 2
    },
    'ff8800': {
        'type': 'path_horizontal',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 0,
        'y': 2
    },
    'ffbb00': {
        'type': 'path_intersection',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 0,
        'y': 3
    },
    'ffbb44': {
        'type': 'path_corner_south_east',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 0,
        'y': 0
    },
    'ffbb88': {
        'type': 'path_corner_west_south',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 1,
        'y': 0
    },
    'ffbbcc': {
        'type': 'corner_south_north_west',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 1,
        'y': 1
    },
    'ffbbff': {
        'type': 'corner_south_east_north',
        'wall': false,
        'spriteSheet': 'img/game/spritesheet.png',
        'x': 0,
        'y': 1
    },
    '0000ff': {
        'type': 'water',
        'wall': false,
        'spriteSheet': 'lalalal',
        'x': 1,
        'y': 4
    },
    'fdffcc': {
        'type': 'sand',
        'wall': false,
        'x': 0,
        'y': 4
    },
    'caff9b': {
        'type': 'grass_top_to_sand_bottom',
        'wall': false,
        'x': 0,
        'y': 5
    },
    'b6ff9b': {
        'type': 'sand_left_to_grass_right',
        'wall': false,
        'x': 1,
        'y': 5
    },
    '5cff1f': {
        'type': 'grass_left_to_sand_right',
        'wall': false,
        'x': 0,
        'y': 6
    },
    '89fd5d': {
        'type': 'sand_top_to_grass_bottom',
        'wall': false,
        'x': 1,
        'y': 6
    },
    'f9ffcc': {
        'type': 'grass_left_top',
        'wall': false,
        'x': 2,
        'y': 5
    },
    'f3ff9b': {
        'type': 'grass_right_top',
        'wall': false,
        'x': 3,
        'y': 5
    },
    'd9ff9b': {
        'type': 'grass_left_bottom',
        'wall': false,
        'x': 2,
        'y': 6
    },
    'e7ff9b': {
        'type': 'grass_right_bottom',
        'wall': false,
        'x': 3,
        'y': 6
    },
    'ccffe2': {
        'type': 'sand_left_top',
        'wall': false,
        'x': 4,
        'y': 5
    },
    'b4fcd4': {
        'type': 'sand_right_top',
        'wall': false,
        'x': 5,
        'y': 5
    },
    '6ffcac': {
        'type': 'sand_left_bottom',
        'wall': false,
        'x': 4,
        'y': 6
    },
    '8dffbf': {
        'type': 'sand_right_bottom',
        'wall': false,
        'x': 5,
        'y': 6
    },
};
