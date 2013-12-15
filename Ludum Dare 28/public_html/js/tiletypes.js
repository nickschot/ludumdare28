var tileTypes = {
    '00ff00': {
        'type': 'grass',
        'wall': false,
        'x': 1,
        'y': 3
    },
    '000000': {
        'type': 'mountain',
        'wall': true,
        'x': 0,
        'y': 0
    },
    'ffff00': {
        'type': 'path_vertical',
        'wall': false,
        'x': 1,
        'y': 2
    },
    'ff8800': {
        'type': 'path_horizontal',
        'wall': false,
        'x': 0,
        'y': 2
    },
    'ffbb00': {
        'type': 'path_intersection',
        'wall': false,
        'x': 0,
        'y': 3
    },
    'ffbb44': {
        'type': 'path_corner_south_east',
        'wall': false,
        'x': 0,
        'y': 0
    },
    'ffbb88': {
        'type': 'path_corner_west_south',
        'wall': false,
        'x': 1,
        'y': 0
    },
    'ffbbcc': {
        'type': 'corner_south_north_west',
        'wall': false,
        'x': 1,
        'y': 1
    },
    'ffbbff': {
        'type': 'corner_south_east_north',
        'wall': false,
        'x': 0,
        'y': 1
    },
    '0000ff': {
        'type': 'test_tile',
        'wall': true,
        'x': 2,
        'y': 0
    }

};
