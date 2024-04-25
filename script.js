var juego = new Phaser.Game(370, 550, Phaser.CANVAS, 'bloque_juego');
var fondoJuego;
var nubes;

var persona; 
var teclaDerecha;
var teclaIzquierda;
var teclaArriba;
var teclaAbajo;
var nuevo;
var enemigos;

var estadoPrincipal = {
    preload: function () {
        juego.load.image('fondo', 'img/Fondo2.png');
        juego.load.image('nubes', 'img/Nubes.png');
        juego.load.spritesheet('animacion', 'img/spritesheet1.png', 128, 128);
        juego.load.spritesheet('enemigo', 'img/Enemigo.png',48,48);


    },
    create: function () {
        fondoJuego = juego.add.sprite(0, 0, 'fondo');

        nubes = juego.add.tileSprite(0, 0, 370, 550, 'nubes');

        nuevo = juego.add.sprite(120, 420, 'animacion');
        nuevo.animations.add('movi', [0, 1, 2, 3, 4, 5], 10, true);

        enemigos=juego.add.group();
        enemigos.enableBody=true;
        enemigos.physicsBodyType=Phaser.Physics.ARCADE;
        for (var y=0; y<3; y++){
            for(var x=0; x<3;x++){
                var enemig=enemigos.create(x*50, y*50, 'enemigo');
                enemig.anchor.setTo(0.5);
            }
        }

        enemigos.x=100;
        enemigos.y=100;
        var animacion=juego.add.tween(enemigos).to(
            {x:200},
            1000,Phaser.Easing.Linear.None,true,0,1000,true
        );

        teclaDerecha = juego.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        teclaIzquierda = juego.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        teclaArriba = juego.input.keyboard.addKey(Phaser.Keyboard.UP);
        teclaAbajo = juego.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },

    update: function () {
        // Movimiento de las nubes
        nubes.tilePosition.x -= 2; 

        if (teclaDerecha.isDown) {
            nuevo.x += 2;
            nuevo.animations.play('movi');
        } else if (teclaIzquierda.isDown) {
            nuevo.position.x -= 2;
            nuevo.animations.play('movi');
        } else if (teclaArriba.isDown) {

        } else if (teclaAbajo.isDown) {
            nuevo.animations.play('movi');
        }
    }
};

juego.state.add('principal', estadoPrincipal);

juego.state.start('principal');
