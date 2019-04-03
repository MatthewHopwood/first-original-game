var GameCanvas;
var ctx;

var Player1;
var PlayerLives = 3;
var MonsterLives = 20;
var BlocksZ1 = [];
var BlocksZ2 = [];
var BlocksZ4 = [];
var BlocksZ5 = [];
var BlocksZ7 = [];
var BlocksZ8 = [];
var DBlocksZ5 = []
var DBlocksZ7 = [];
var DBlocksZ8 = [];
var FBlocksZ5 = [];
var Z8Chest;
var Bullets = [];
var MovingNPCs = [];
var SafeZones = [];
var Zone4MonsterAlive = true;
var Zone4Monster;
var BigStars = [];
var LittleStars = [];
var TreesZ2 = [];
var TreesZ3 = [];
var LBlock;
var RBlock;
var UnderPantCastle;
var UnderPantHole;
var Z9Gate;
var Next = false;
var Next2 = false;
var Next3 = false;
var Next4 = false;

var Zone7Timer = 0;
var Zone6Timer; 

var GameMode = 'ForestEntrance';
//ForestEntrance change back when finished.

var WKeyDown = false;
var SKeyDown = false;
var AKeyDown = false;
var DKeyDown = false;

var IPressed = false;
var JPressed = false;
var KPressed = false;
var LPressed = false;


function Player(x, y, speed)
{
    this.x = x;
    this.y = y;
    this.width = 80;
    this.height = 80;
    this.speed = speed;
    this.update = function()
    {
        if (PlayerLives > 0)
        {
            if (WKeyDown)
            {
                this.y -= this.speed;
                if(GameMode == 'ForestEntrance')
                {
                    this.dueCollisionY();
                }

                if (GameMode == 'ForestEntrance' && this.y < 40)
                {
                    GameMode = 'Zone4';
                    ResetBullets();
                    this.x = 460;
                    this.y = 660;
                }
        
                if (GameMode == 'ForestRiver' && this.y < 230)
                {
                    this.y = 230;
                }

                if (GameMode == 'RiverEnd' && this.y < 210)
                {
                    this.y = 210;
                }

                if (GameMode == 'Zone4' && this.y < 40 && Zone7Timer == 0)
                {
                    GameMode = 'Zone7';
                    ResetBullets();
                    this.x = 460;
                    this.y = 660;
                }
                else if (GameMode == 'Zone4' && this.y < 40 && Zone7Timer > 0)
                {
                    GameMode = 'Zone7';
                    ResetBullets();
                    this.x = 400;
                    this.y = 660;
                }

                if (GameMode == 'Zone7')
                {
                    for(var t = 0; t < DBlocksZ7.length; t++)
                    {
                        this.dueCollisionY1(DBlocksZ7[t]);
                    }
                }

                if (GameMode == 'Zone7' && this.y < 60)
                {
                    this.y = 60;
                }
                
                if (GameMode == 'Zone8')
                {
                    this.dueCollisionY1(Z8Chest);
                    for(var t = 0; t < DBlocksZ8.length; t++)
                    {
                        this.dueCollisionY1(DBlocksZ8[t]);
                    }
                    
                }

                if (GameMode == 'Zone8' && this.y < 60)
                {
                    this.y = 60;
                }

                if (GameMode == 'Zone5')
                {
                    for(var t = 0; t < DBlocksZ5.length; t++)
                    {
                        this.dueCollisionY1(DBlocksZ5[t]);
                    }
                }

                if (GameMode == 'Zone5' && this.y < 40)
                {
                    GameMode = 'Zone8';
                    ResetBullets();
                    this.x = 460;
                    this.y = 660;
                }
                
                if (GameMode == 'Zone6' && this.y < 40)
                {
                    GameMode = 'Zone9'
                    ResetBullets();
                    this.x = 460;
                    this.y = 660;
                }

                if (GameMode == 'Zone9')
                {
                    this.dueCollisionY1(UnderPantCastle)
                }

                if (GameMode == 'Zone9' && this.y < 40)
                {
                    this.y = 40;
                }

                if (GameMode == 'Zone10' && this.y < 40)
                {
                    GameMode = 'Zone6';
                    this.x = 460;
                    this.y = 660;
                    ResetBullets();
                    Zone6Timer = 0;
                }
            }
            if (AKeyDown)
            {
                this.x -= this.speed;

                if(GameMode == 'ForestEntrance')
                {
                    this.dueCollisionX();
                }

                if (GameMode == 'ForestEntrance' && this.x < 60)
                {
                    this.x = 60;
                }

                if (GameMode == 'ForestRiver' && this.x < 40)
                {
                    GameMode = 'ForestEntrance';
                    ResetBullets();
                    this.x = 960;
                    this.y = 400;
                }
                if (GameMode == 'Zone4' && this. x < 60)
                {
                    this.x = 60;
                }

                if (GameMode == 'RiverEnd' && this.x < 40)
                {
                    GameMode = 'ForestRiver';
                    ResetBullets();
                    this.x = 960;
                    this.y = 400;
                }

                if (GameMode == 'Zone7')
                {
                    for(var t = 0; t < DBlocksZ7.length; t++)
                    {
                        this.dueCollisionX1(DBlocksZ7[t]);
                    }
                }
            
                if (GameMode == 'Zone7' && this.x < 60)
                {
                    this.x = 60;
                }

                if (GameMode == 'Zone8')
                {
                    for(var t = 0; t < DBlocksZ8.length; t++)
                    {
                        this.dueCollisionX1(DBlocksZ8[t]);
                    }
                }

                if (GameMode == 'Zone8' && this.x < 40)
                {
                    GameMode = 'Zone7';
                    ResetBullets();
                    this.x = 960;
                    this.y = 400;                
                }

                if (GameMode == 'Zone5')
                {
                    for(var t = 0; t < DBlocksZ5.length; t++)
                    {
                        this.dueCollisionX1(DBlocksZ5[t]);
                    }
                }

                if (GameMode == 'Zone5' && this.x < 60)
                {
                    this.x = 60;
                }

                if (GameMode == 'Zone6' && this.x < 40)
                {
                    GameMode = 'Zone5';
                    ResetBullets();
                    this.x = 960;
                    this.y = 310;
                }

                if (GameMode == 'Zone9')
                {
                    this.dueCollisionX1(UnderPantCastle)
                }
                 
                if (GameMode == 'Zone9' && this.x < 40)
                {
                    this.x = 40;
                }

                if (GameMode == 'Zone10' && this.x < 60)
                {
                    this.x = 60;
                }
            }
            if (SKeyDown)
            {
                this.y += this.speed;
                if(GameMode == 'ForestEntrance')
                {
                    this.dueCollisionY();
                }

            if (GameMode == 'ForestEntrance' && this.y > 640)
                {
                    this.y = 640;
                }
                if (GameMode == 'ForestRiver' && this.y > 560)
                {
                    this.y = 560;
                }

                if (GameMode == 'Zone4' && this.y > 660)
                {
                    GameMode = 'ForestEntrance';
                    ResetBullets();
                    this.x = 460;
                    this.y = 40;
                }
                if (GameMode == 'RiverEnd' && this.y > 560)
                {
                    this.y = 560;
                }

                if (GameMode == 'Zone7')
                {
                    for(var t = 0; t < DBlocksZ7.length; t++)
                    {
                        this.dueCollisionY1(DBlocksZ7[t]);
                    }
                }
                
                if (GameMode == 'Zone7' && this.y > 660)
                {
                    if(RBlock.y < 650)
                    {
                        this.y = 660;
                    }
                    else
                    {
                        GameMode = 'Zone4';
                        ResetBullets();
                        this.x = 460;
                        this.y = 40;
                    }
                }

                if (GameMode == 'Zone8')
                {
                    for(var t = 0; t < DBlocksZ8.length; t++)
                    {
                        this.dueCollisionY1(DBlocksZ8[t]);
                    }
                }

                if (GameMode == 'Zone8' && this.y > 660)
                {
                    if (Next && DBlocksZ8.length == 0)
                    {
                        Progress();
                    }
                    else
                    {
                        this.y = 660;
                    }
                }
                
                if (GameMode == 'Zone5')
                {
                    for(var t = 0; t < DBlocksZ5.length; t++)
                    {
                        this.dueCollisionY1(DBlocksZ5[t]);
                    }
                }

                if (GameMode == 'Zone5' && this.y > 640)
                {
                    this.y = 640;
                }

                if (GameMode == 'Zone9')
                {
                    this.dueCollisionY1(UnderPantCastle);
                }

                if (GameMode == 'Zone9' && this.y > 660)
                {
                    GameMode = 'Zone6';
                    ResetBullets();
                    this.x = 460;
                    this.y = 40;
                    Zone6Timer = 0;
                }
                
                if (GameMode == 'Zone6' && this.y > 640)
                {
                    GameMode = 'Zone10';
                    ResetBullets();
                    this.x = 460;
                    this.y = 40;
                }

                if (GameMode == 'Zone10' && this.y > 640)
                {
                    this.y = 640;
                }

            }
            if (DKeyDown)
            {
                this.x += this.speed;
                if(GameMode == 'ForestEntrance')
                {
                    this.dueCollisionX();
                }

                if (this.x > 960 && GameMode == 'ForestEntrance')
                {
                    ForestRiver();
                    GameMode = 'ForestRiver';
                    ResetBullets();
                    this.x = 40;
                    this.y = 400;
                }
                if (GameMode == 'Zone4' && this.x > 940)
                {
                    this.x = 940;
                }
                
                if (GameMode == 'ForestRiver' && this.x > 960)
                {
                    GameMode = 'RiverEnd';
                    ResetBullets();
                    this.x = 40;
                    this.y = 400;
                }
                if (GameMode == 'RiverEnd' && this. x > 760)
                {
                    this.x = 760;
                }

                if (GameMode == 'Zone7')
                {
                    for(var t = 0; t < DBlocksZ7.length; t++)
                    {
                        this.dueCollisionX1(DBlocksZ7[t]);
                    }
                }
                if (GameMode == 'Zone7')
                {
                    if (this.x > 960 && DBlocksZ7.length == 0)
                    {
                        GameMode = 'Zone8';
                        ResetBullets();
                        this.x = 40;
                        this.y = 400;
                    }
                    else if (this.x > 960 && DBlocksZ7.length > 0)
                    {
                        this.x = 960;
                    }
                }

                if (GameMode == 'Zone8')
                {
                    this.dueCollisionX1(Z8Chest);

                    for(var t = 0; t < DBlocksZ8.length; t++)
                    {
                        this.dueCollisionX1(DBlocksZ8[t]);
                    }
                }

                if(GameMode == 'Zone8' && this.x > 940)
                {
                    this.x = 940;
                }

                if (GameMode == 'Zone5')
                {
                    for(var t = 0; t < DBlocksZ5.length; t++)
                    {
                        this.dueCollisionX1(DBlocksZ5[t]);
                    }
                }

                if (GameMode == 'Zone5' && this.x > 960)
                {
                    if(DBlocksZ5.length == 0)
                    {
                        GameMode = 'Zone6';
                        ResetBullets();
                        this.x = 40;
                        this.y = 350;
                        Zone6Timer = 0;
                    }
                    else
                    {
                        this.x = 960;
                    }
                }

                if (GameMode == 'Zone9')
                {
                    this.dueCollisionX1(UnderPantCastle);
                }

                if (GameMode == 'Zone9' && this.x > 960)
                {
                    this.x = 960;
                }

                if (GameMode == 'Zone10' && this.x > 940)
                {
                    this.x = 940;
                }
            }
        }
        
        this.draw();
        this.dueCollision();

        if (GameMode == 'Zone7')
        {
            this.dueCollision2(RBlock);
            this.dueCollision2(LBlock);
        }
    }
    this.draw = function()
    {
        var x = this.x - this.width / 2;
        var y = this.y - this.height / 2;

        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillRect(x, y, this.width, this.height);

        if (PlayerLives == 3)
        {
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillText('3 Lives', this.x - 30, this.y - 5);
        }
        else if (PlayerLives == 2)
        {
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillText('2 Lives', this.x - 30, this.y - 5);
        }
        else if (PlayerLives == 1)
        {
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillText('1 Life', this.x - 30, this.y - 5);
        }
        else if (PlayerLives == 0)
        {
            ctx.font = '17px Arial';
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillText('Dead x_x', this.x - 40, this.y - 5);

            ctx.font = '100px Arial';
            ctx.fillStyle = 'rgb(255, 0, 0)';
            ctx.fillText('GAME OVER ;)', 150, 350);
            
            setTimeout(function() {
                location.reload();
            }, 2500)
        }

        if(UnderPantCastle.clicked && Next3 && !Next4)
        {
            ctx.fillStyle = 'rgb(248, 203, 2)';
            ctx.fillRect(this.x - 40, this.y + 10, this. width, this.height - 50);

            ctx.fillStyle = 'rgb(255, 0, 157)';
            ctx.fillRect(this.x - 40, this.y + 10, this. width, 10);
            
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(this.x - 5, this.y + 30, 10, 10);
        }
    }
    this.FireUp = function()
    {
       var bullet = new Bullet(this.x, this.y - 42, 0, -7);
    }
    this.FireDown = function()
    {
        var bullet = new Bullet(this.x, this.y + 42, 0, 7);
    }
    this.FireLeft = function()
    {
        var bullet = new Bullet(this.x - 42, this.y, - 7, 0);
    }
    this.FireRight = function()
    {
        var bullet = new Bullet(this.x + 42, this.y, 7, 0);
    }
    this.dueCollision = function()
    {
        if (MonsterLives > 1)
        {
            var totalWidth = Zone4Monster.width + this.width;
            var totalHeight = Zone4Monster.height + this.height;
            
            var dx = Math.abs(Zone4Monster.x - this.x);
            var dy = Math.abs(Zone4Monster.y - this.y);
            
            if (dx <= totalWidth / 2  && dy <= totalHeight / 2 && GameMode == 'Zone4')
            {
                this.x = 500;
                this.y = 660;
                PlayerLife();
            }
        }
        else
        {
            var totalWidth = Zone4Monster.width / 2 + this.width;
            var totalHeight = Zone4Monster.height + this.height;
            
            var dx = Math.abs(Zone4Monster.x - this.x);
            var dy = Math.abs(Zone4Monster.y - this.y);
            
            if (dx <= totalWidth / 2  && dy <= totalHeight / 2 && GameMode == 'Zone4')
            {
                this.x = 500;
                this.y = 660;              
            }
        }
    }
    this.dueCollision2 = function(object)
    {
        var TotalWidth = object.width + this.width;
        var TotalHeight = object.height + this.height;
        
        var dx = Math.abs(object.x - this.x);
        var dy = Math.abs(object.y - this.y);
        
        if (dx < TotalWidth / 2 && dy < TotalHeight / 2)
        {   
            this.x = 400;
            this.y = 660;
            PlayerLife();
        }
    }
    this.dueCollisionY = function()
    {
        var compareWidth = Wizard.width + this.width;
        var compareHeight = Wizard.height + this.height;
        
        var dx = Math.abs(Wizard.x - this.x);
        var dy = Math.abs(Wizard.y - this.y);
        
        if (dx <= compareWidth / 2 && dy <= compareHeight / 2)
        { 
            this.y = Wizard.y - Wizard.height;           
        }
    }
    this.dueCollisionX = function()
    {
        var compareWidth = Wizard.width + this.width;
        var compareHeight = Wizard.height + this.height;
        
        var dx = Math.abs(Wizard.x - this.x);
        var dy = Math.abs(Wizard.y - this.y);
        
        if (dx <= compareWidth / 2 && dy <= compareHeight / 2)
        {
            this.x = Wizard.x + Wizard.width;            
        }
    }

    this.dueCollisionY1 = function(object2)
    {
        var compareWidth = object2.width + this.width;
        var compareHeight = object2.height + this.height;
        
        var dx = Math.abs(object2.x - this.x);
        var dy = Math.abs(object2.y - this.y);
        
        if (dx < compareWidth / 2 && dy < compareHeight / 2)
        { 
            if (this.y < object2.y)
            {
                this.y = object2.y - (object2.height / 2) - (this.height / 2); 
            }
            else
            {
                this.y = object2.y + (object2.height / 2) + (this.height / 2); 
            }                  
        }
    }
    this.dueCollisionX1 = function(object3)
    {
        var compareWidth = object3.width + this.width;
        var compareHeight = object3.height + this.height;
        
        var dx = Math.abs(object3.x - this.x);
        var dy = Math.abs(object3.y - this.y);
        
        if (dx < compareWidth / 2 && dy < compareHeight / 2)
        {
            if (this.x < object3.x)
            {
                this.x = object3.x - (object3.width / 2) - (this.width / 2); 
            }
            else
            {
                this.x = object3.x + (object3.width / 2) + (this.width / 2); 
            }                 
        }
    }
    this.die = function()
    {
        PlayerLife();
    }
}

function BigStar(x, y, width, height, name, colour)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.colour = colour;
    this.clicked = false;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if(GameMode == 'RiverEnd')
        {
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + 15, this.y + 40);
            ctx.lineTo(this.x + 45, this.y + 40);
            ctx.lineTo(this.x + 25, this.y + 65);
            ctx.lineTo(this.x + 40, this.y + 105);
            ctx.lineTo(this.x, this.y + 85);
            ctx.lineTo(this.x - 40, this.y + 105);
            ctx.lineTo(this.x - 25, this.y + 65);
            ctx.lineTo(this.x - 45, this.y + 40);
            ctx.lineTo(this.x - 15, this.y + 40);
            ctx.closePath();
            ctx.fill();
        }

        if (this.name == 'YellowStar')
        {
            if (this.clicked)
            {
                ctx.font = '40px Arial'
                ctx.fillStyle = 'rgb(255, 255, 0)';
                ctx.fillText('You Lose A Life, Think Again!', 150,  650);
            }
        }
        if (this.name == 'GreenStar')
        {
            if (this.clicked)
            {
                ctx.font = '40px Arial'
                ctx.fillStyle = 'rgb(0, 255, 0)';
                ctx.fillText('You Lose A Life, Think Again!', 150,  650);
            }
        }
        if (this.name == 'PinkStar')
        {
            if (this.clicked)
            {
                ctx.font = '40px Arial'
                ctx.fillStyle = 'rgb(255, 0, 255)';
                ctx.fillText('You Lose A Life, Think Again!', 150,  650);
            }
        }
   }
   this.isClicked = function(x, y)
   {
        if (GameMode == 'RiverEnd')
        {
            if (this.name == 'YellowStar')
            {
                if (x > 855 && x < 945 && y > 60 && y < 165)
                {
                    PlayerLife();
                    return true;
                }
                else 
                {
                    return false;
                }
            }
        
            else if (this.name == 'GreenStar')
            {
                if (x > 855 && x < 945 && y > 300 && y < 405)
                {
                    PlayerLife();
                    return true;
                }
                else 
                {
                    return false;
                }
            }
            
        else if (this.name == 'PinkStar')
            {
                if (x > 855 && x < 945 && y > 560 && y < 665)
                {
                    PlayerLife();
                    return true;
                }
                else 
                {
                    return false;
                }
            }
        }  
   }
   this.NotClicked = function()
   {
       this.clicked = false;
   }
   this.Clicked = function()
   {
       this.clicked = true;
   }
   BigStars.push(this);
}

function LittleStar(x, y, width, height, name, colour)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.colour = colour;
    this.clicked = false;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if(GameMode == 'RiverEnd')
        {
            ctx.fillStyle = this.colour;
            ctx.beginPath();
            ctx.moveTo(this.x, this.y);
            ctx.lineTo(this.x + 5, this.y + 20);
            ctx.lineTo(this.x + 25, this.y + 20);
            ctx.lineTo(this.x + 15, this.y + 45);
            ctx.lineTo(this.x + 20, this.y + 65);
            ctx.lineTo(this.x, this.y + 55);
            ctx.lineTo(this.x - 20, this.y + 65);
            ctx.lineTo(this.x - 15, this.y + 45);
            ctx.lineTo(this.x - 25, this.y + 20);
            ctx.lineTo(this.x - 5, this.y + 20);
            ctx.closePath();
            ctx.fill();
        }
   
        if (this.name == 'YellowStar')
        {
            if (this.clicked)
            {
                ctx.font = '20px Arial'
                ctx.fillStyle = 'rgb(255, 255, 0)';
                ctx.fillText('You Lose A Life, Think Again!', 200,  650);
            }
        }
        if (this.name == 'GreenStar')
        {
            if (this.clicked)
            {
                ctx.font = '20px Arial'
                ctx.fillStyle = 'rgb(0, 255, 0)';
                ctx.fillText('You Lose A Life, Think Again!', 200,  650);
            }
        }
        if (this.name == 'PinkStar')
        {
            if (this.clicked)
            {
                ctx.font = '20px Arial'
                ctx.fillStyle = 'rgb(255, 0, 255)';
                ctx.fillText('You Lose A Life, Think Again!', 200,  650);
            }
        }
        if (this.name == 'RedStar')
        {
            if (this.clicked)
            {
                ctx.font = '40px Arial'
                ctx.fillStyle = 'rgb(255, 0, 0)';
                ctx.fillText('Well done! Password is Blue Charmander ', 100,  650);
                ctx.font = '20px Arial'
                ctx.fillText('Hint - Reds are innocent!', 100,  675);
            }
        }
        }
    this.isClicked = function(x, y)
    {
        if (GameMode == 'RiverEnd')
        {
            if (this.name == 'YellowStar')
            {
                if (x > 835 && x < 885 && y > 200 && y < 265)
                {
                    PlayerLife();
                    return true;
                }
                else 
                {
                    return false;
                }
            }
            
            else if (this.name == 'GreenStar')
            {
                if (x > 915 && x < 965 && y > 200 && y < 265)
                {
                    PlayerLife();
                    return true;
                }
                else 
                {
                    return false;
                }
            }
        
            else if (this.name == 'PinkStar')
            {
                if (x > 835 && x < 885 && y > 460 && y < 525)
                {
                    PlayerLife();
                    return true;
                }
                else 
                {
                    return false;
                }
            }

            else if (this.name == 'RedStar')
            {
                if (x > 915 && x < 965 && y > 460 && y < 525)
                {
                    return true;
                }
                else 
                {
                    return false;
                }
            }
        }
    }  
     
    this.NotClicked = function()
    {
        this.clicked = false;
    }
    this.Clicked = function()
    {
        this.clicked = true;
    }
    LittleStars.push(this);
}

function Gate(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function()
    {
        this.draw();
        this.collide(Player1);
    } 
    this.draw = function()
    {
        if (!Next2)
        {
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
        else
        {
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width / 2, this.height);
        }
    }
    this.collide = function(object)
    {
        var TotalWidth = object.width + this.width;
        var TotalHeight = object.height + this.height;
        
        var dx = Math.abs(object.x - this.x);
        var dy = Math.abs(object.y - this.y);
        
        if (dx < TotalWidth / 2 && dy < TotalHeight / 2 && !Next2)
        {
            object.x = 460;
            object.y = 660;
        }

    }
}

function TreeZ2(x, y)
{
    this.x = x;
    this.y = y;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = 'rgb(36, 77 ,10)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 50, this.y + 50);
        ctx.lineTo(this.x + 30, this.y + 50);
        ctx.lineTo(this.x + 70, this.y + 110);
        ctx.lineTo(this.x - 70, this.y + 110);
        ctx.lineTo(this.x - 30, this.y + 50);
        ctx.lineTo(this.x - 50, this.y + 50);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgb(75, 40, 0)';
        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y + 110);
        ctx.lineTo(this.x + 15, this.y + 170);
        ctx.lineTo(this.x - 15, this.y + 170);
        ctx.lineTo(this.x - 15, this.y + 110);
        ctx.closePath();
        ctx.fill();
    }
    TreesZ2.push(this);
}

function TreeZ3(x, y)
{
    this.x = x;
    this.y = y;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = 'rgb(36, 77 ,10)';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + 50, this.y + 50);
        ctx.lineTo(this.x + 30, this.y + 50);
        ctx.lineTo(this.x + 70, this.y + 110);
        ctx.lineTo(this.x - 70, this.y + 110);
        ctx.lineTo(this.x - 30, this.y + 50);
        ctx.lineTo(this.x - 50, this.y + 50);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = 'rgb(75, 40, 0)';
        ctx.beginPath();
        ctx.moveTo(this.x + 15, this.y + 110);
        ctx.lineTo(this.x + 15, this.y + 170);
        ctx.lineTo(this.x - 15, this.y + 170);
        ctx.lineTo(this.x - 15, this.y + 110);
        ctx.closePath();
        ctx.fill();
    }
    TreesZ3.push(this);
}

function NPC(x, y, width, height, name, colour, vy)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.name = name;
    this.colour = colour;
    this.vy = 13;
    this.clicked = false;
    this.touched = false;
    this.update = function()
    {
        if (Zone7Timer > 3)
        {
            if (this.name == 'Left' || this.name == 'Right')
            { 
                this.y += this.vy;
                if (this.y > 650)
                {
                    this.y = 650;
                }
            }

        }

        this.draw();
        if (this.name == 'RiddlePanel')
        {
            this.collide(Player1);
        }

        if (this.name == 'Teleporter')
        {
            this.collide(Player1);
        }
    }
    this.draw = function()
    {
        var x1 = this.x - this.width / 2;
        var y1 = this.y - this.height / 2;

        ctx.fillStyle = this.colour;
        ctx.fillRect(x1, y1, this.width, this.height);

        if(this.name == 'Wizard' && this.clicked == false && !Next3)
        {
            ctx.fillStyle = 'rgb(255, 255, 0 )';
            ctx.fillRect(x - 5, y - 30, 9, 35);
            ctx.fillRect(x - 5, y + 15, 9, 10);
        }
        else if (Player1.x > 0 && Player1.y < 700 && this.name == 'Wizard' && this.clicked == true && !Next3)
        {    
            ctx.beginPath();
            ctx.moveTo(55, 610);
            ctx.bezierCurveTo(95, 600, 105, 630, 65, 635);
            ctx.lineTo(65, 650);
            ctx.lineWidth = 7;
            ctx.strokeStyle = 'orange';
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(65, 655);
            ctx.lineTo(65, 660);
            ctx.lineWidth = 7;
            ctx.strokeStyle = 'orange';
            ctx.stroke();
        }
        else if (this.name == 'Wizard' && this.clicked == true && Next4)
        {
            ctx.fillStyle = 'rgb(248, 203, 2)';
            ctx.fillRect(this.x - 50, this.y + 10, 100, 40);

            ctx.fillStyle = 'rgb(255, 0, 157)';
            ctx.fillRect(this.x - 50, this.y + 10, 100, 15);

            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.fillRect(this.x - 10, this.y + 40, 20, 10);
        }
        
        if (this.name == 'UnderPantCastle')
        {
            ctx.fillStyle = 'rgb(255, 0, 157)';
            ctx.fillRect(90, 45, 600, 75);

            ctx.font = '30px Arial';
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillText('UnderPants Castle!! Click me ;)!', 150, 100);
            
        }

        if (this.name == 'z8chest' && this.clicked == false)
        {
            ctx.fillStyle = this.colour;
            ctx.fillRect(x1, y1, this.width, this.height);
        }
        else if (this.name == 'z8chest' && this.clicked == true)
        {
            ctx.fillStyle = this.colour;
            ctx.fillRect(x1, y1, this.width, this.height);

            ctx.fillStyle = 'rgb(220, 200, 20)';
            ctx.fillRect(x1, y1, this.width, 30);
        }
        else if (this.name == 'UnderPantCastle' && this.clicked == true)
        {
            ctx.font = '20px Arial';
            ctx.fillStyle = 'rgb(0, 0, 0)';
            ctx.fillText('Touch me to', 790, 100);
            ctx.fillText('return to the', 790, 140);
            ctx.fillText('Wizard!', 790, 180);    
        }

    }
    this.isClicked = function(x, y)
    {
        var x1 = this.x - this.width / 2;
        var y1 = this.y - this.height / 2;

        if (GameMode == 'ForestEntrance')
        {
            if (x > x1 - this.width && x < x1 + this.width && y > y1 && y < y1 + this.height)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        if (GameMode == 'Zone8')
        {
            if (x > x1 - this.width && x < x1 + this.width && y > y1 && y < y1 + this.height)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        if (GameMode == 'Zone9' && this.name == 'UnderPantCastle')
        {
            if (x > x1 - this.width && x < x1 + this.width && y > y1 && y < y1 + this.height)
            {
                return true;
            }
            else
            {
                return false;
            }
        }
    }
    this.collide = function(object)
    {
        var total_width = object.width + this.width;
        var total_height = object.height + this.height;
        
        var dx = Math.abs(object.x - this.x);
        var dy = Math.abs(object.y - this.y);
        
        if (dx <= total_width / 2 && dy <= total_height / 2)
        {
    
            this.touched = true;
        }
        else
        {
            this.touched = false;
        }

    }
}

function WhiteBox(x, y)
{
    this.x = x;
    this.y = y;
    this.width = 100;
    this.height = 100;
    this.colour = 'rgb(255, 255, 255)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}

function MovingNPC(x, y, colour, vx)
{
    this.x = x;
    this.y = y;
    this.width = 120;
    this.height = 10;
    this.colour = colour;
    this.vx = vx;
    this.update = function()
    {
        if (Zone6Timer >= 3 && Zone6Timer < 9)
        {
            this.x += this.vx;
            if (this.x > 940)
            {
                this.x = 940;
            }
        }
        else if (Zone6Timer >= 9 && Zone6Timer < 15)
        {
            this.x -= this.vx;
            if (this.x < 60)
            {
                this.x = 60;
            }
        }
        else if (Zone6Timer >= 15 && Zone6Timer < 21)
        {
            this.x += this.vx;
            if (this.x > 940)
            {
                this.x = 940;
            }
        }
        else if (Zone6Timer >= 21 && Zone6Timer < 27)
        {
            this.x -= this.vx;
            if (this.x < 60)
            {
                this.x = 60;
            }
        }
        else if (Zone6Timer >= 27 && Zone6Timer < 33)
        {
            this.x += this.vx;
            if (this.x > 940)
            {
                this.x = 940;
            }
        }
        else if (Zone6Timer >= 33 && Zone6Timer < 39)
        {
            this.x -= this.vx;
            if (this.x < 60)
            {
                this.x = 60;
            }
        }
         else if (Zone6Timer >= 39 && Zone6Timer < 46)
        {
            this.x += this.vx;
            if (this.x > 940)
            {
                this.x = 940;
            }
        }
        else if (Zone6Timer >= 46 && Zone6Timer < 51)
        {
            this.x -= this.vx;
            if (this.x < 60)
            {
                this.x = 60;
            }
        }
        else if (Zone6Timer >= 51 && Zone6Timer < 57)
        {
            this.x += this.vx;
            if (this.x > 940)
            {
                this.x = 940;
            }
        }
        else if (Zone6Timer >= 57 && Zone6Timer < 63)
        {
            this.x -= this.vx;
            if (this.x < 60)
            {
                this.x = 60;
            }
        }
        this.draw();
        this.collide(Player1);
    }
    this.draw = function()
    {
        var x = this.x - this.width / 2
        var y = this.y - this.height / 2

        ctx.fillStyle = this.colour;
        ctx.fillRect(x, y, this.width, this.height);
    }
    this.collide = function(object)
    {
        var TotalWidth = object.width + this.width;
        var TotalHeight = object.height + this.height;
        
        var dx = Math.abs(object.x - this.x);
        var dy = Math.abs(object.y - this.y);
        
        if (dx < TotalWidth / 2 && dy < TotalHeight / 2)
        {
            object.die();
            object.x = 40;
            object.y = 350;
        }

    }
    MovingNPCs.push(this);
}

function SafeZone(y)
{
    this.x = 0;
    this.y = y;
    this.width = 1000;
    this.height = 90;
    this.colour = 'rgb(240, 240, 240)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    SafeZones.push(this);
}

function Bullet(x, y, vx, vy)
{
    this.x = x;
    this.y = y;
    this.width = 20;
    this.height = 20;
    this.vx = vx;
    this.vy = vy;
    this.update = function()
    {
        this.x += this.vx;
        this.y += this.vy;

        this.draw();
        this.dueCollision();
    }
    this.draw = function()
    {
        var x = this.x - this.width / 2;
        var y = this.y - this.height / 2;

        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(x, y, this.width, this.height);
    }
    this.dueCollision = function()
    {
        var compareWidth = Zone4Monster.width + this.width;
        var compareHeight = Zone4Monster.height + this.height;
        
        var dx = Math.abs(Zone4Monster.x - this.x);
        var dy = Math.abs(Zone4Monster.y - this.y);
        
        if (dx <= compareWidth / 2 && dy <= compareHeight / 2 && GameMode == 'Zone4')
        {
            LoseALife();
            RemoveBullet(this);            
        }

        if (GameMode == 'Zone5')
        {
            for(var t = 0; t < DBlocksZ5.length; t++)
            {
                this.collide(DBlocksZ5[t]);
            }

            for(var t = 0; t < FBlocksZ5.length; t++)
            {
                this.collide(FBlocksZ5[t]);
            }
        }

        if (GameMode == 'Zone7')
        {
            for(var t = 0; t < DBlocksZ7.length; t++)
            {
                this.collide(DBlocksZ7[t]);
            }
        }
        
        if (GameMode == 'Zone8')
        {
            for(var t = 0; t < DBlocksZ8.length; t++)
            {
                this.collide(DBlocksZ8[t]);
            }
        }
    }
    this.collide = function(object)
    {
        var total_width = object.width + this.width;
        var total_height = object.height + this.height;
        
        var dx = Math.abs(object.x - this.x);
        var dy = Math.abs(object.y - this.y);
        
        if (dx <= total_width / 2 && dy <= total_height / 2)
        {
            object.die();
            RemoveBullet(this);
        }

    }
    Bullets.push(this);
}

function BlockZ1(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = 'rgb(0, 0, 0)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    BlocksZ1.push(this)

}

function BlockZ2(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = 'rgb(0, 0, 0)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if (GameMode == 'ForestRiver')
        {
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }    
    }
    BlocksZ2.push(this)

}

function BlockZ4(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = 'rgb(0, 0, 0)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if (GameMode == 'Zone4')
        {
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    BlocksZ4.push(this)
}

function BlockZ5(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = 'rgb(0, 0, 0)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if (GameMode == 'Zone5')
        {
            ctx.fillStyle = this.colour;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    BlocksZ5.push(this)
}

function BlockZ7(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = 'rgb(0, 0, 0)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    BlocksZ7.push(this)
}

function BlockZ8(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.colour = 'rgb(0, 0, 0)';
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        ctx.fillStyle = this.colour;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    BlocksZ8.push(this)
}


function Monster(x, y,)
{
    this.x = x;
    this.y = y;
    this.width = 1000;
    this.height = 200;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        if (GameMode == 'Zone4' && Zone4MonsterAlive)
        {
            if(MonsterLives > 10)
            {
                ctx.fillStyle = 'rgb(255, 0, 0)';
            }
            else
            {
                ctx.fillStyle = 'rgb(0, 0, 255)';
            }

            if (MonsterLives > 1)
            {
                ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
            }
            else
            {
                ctx.fillRect(this.x - this.width / 2 + this.width / 4, this.y - this.height / 2, this.width / 2, this.height);
            }

            if (MonsterLives > 1)
            {
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(400, 300, 40, 40);
            }
            else
            {
                ctx.strokeStyle = 'rgb(0, 0, 0)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(400, 300);
                ctx.lineTo(440, 340);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(440, 300);
                ctx.lineTo(400, 340);
                ctx.stroke();
            }

            if (MonsterLives > 1)
            {
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(600, 300, 40, 40);
            }
            else
            {
                ctx.strokeStyle = 'rgb(0, 0, 0)';
                ctx.lineWidth = 3;
                ctx.beginPath();
                ctx.moveTo(600, 300);
                ctx.lineTo(640, 340);
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(640, 300);
                ctx.lineTo(600, 340);
                ctx.stroke();
            }
           
            if(MonsterLives > 10)
            {
                ctx.beginPath();
                ctx.arc(520, 360, 50, 0, Math.PI);
                ctx.fill();
            }
            else if (MonsterLives <= 10 && MonsterLives > 1)
            {
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.fillRect(470, 370, 100, 30);
            }
            else if (MonsterLives <= 1)
            {
                ctx.fillStyle = 'rgb(0, 0, 0)';
                ctx.beginPath();
                ctx.arc(520, 360, 50, 0, 2 * Math.PI);
                ctx.fill();
            }
        }
    }
}

function DBlockZ5(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        var X = this.x - this.width / 2;
        var Y = this.y - this.height / 2;

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(X, Y, this.width, this.height);
    }
    this.removeDBlock = function()
    {
        for (var t = 0; t < DBlocksZ5.length; t++)
        {
            if (DBlocksZ5[t] == this)
            {
                DBlocksZ5.splice(t, 1);
                return;
            }
        }
    }
    this.die = function()
    {
        this.removeDBlock();
    }
    DBlocksZ5.push(this);
}

function DBlockZ7(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        var X = this.x - this.width / 2;
        var Y = this.y - this.height / 2;

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(X, Y, this.width, this.height);
    }
    this.removeDBlock = function()
    {
        for (var t = 0; t < DBlocksZ7.length; t++)
        {
            if (DBlocksZ7[t] == this)
            {
                DBlocksZ7.splice(t, 1);
                return;
            }
        }
    }
    this.die = function()
    {
        this.removeDBlock();
    }
    DBlocksZ7.push(this);
}

function DBlockZ8(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        var X = this.x - this.width / 2;
        var Y = this.y - this.height / 2;

        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillRect(X, Y, this.width, this.height);
    }
    this.removeDBlock = function()
    {
        for (var t = 0; t < DBlocksZ8.length; t++)
        {
            if (DBlocksZ8[t] == this)
            {
                DBlocksZ8.splice(t, 1);
                return;
            }
        }
    }
    this.die = function()
    {
        this.removeDBlock();
    }
    DBlocksZ8.push(this);
}

function FBlockZ5(x, y, width, height)
{
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.update = function()
    {
        this.draw();
    }
    this.draw = function()
    {
        var X = this.x - this.width / 2;
        var Y = this.y - this.height / 2;

        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(X, Y, this.width, this.height);
    }
    this.die = function()
    {
        PlayerLife();
    }
    FBlocksZ5.push(this);
}

function ResetBullets()
{
    Bullets = [];
}

function RemoveBullet(bullet)
{
    for (var t = 0; t < Bullets.length; t++)
    {
        if (Bullets[t] == bullet)
        {
            Bullets.splice(t, 1);
            return;
        }
    }
}

function LoseALife()
{
    MonsterLives--;
}

function PlayerLife()
{
    PlayerLives --;
}

function Progress()
{
    if (Next)
    {
        GameMode = 'Zone5';
        ResetBullets();
        Player1.x = 460;
        Player1.y = 40;
    }
}

function Teleport()
{
    GameMode = 'ForestEntrance'
    ResetBullets();
    this.x = 460;
    this.y = 40;
}

function UnderPantHole()
{
    if (GameMode == 'Zone9')
    {
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fillRect(340, 250, 100, 100);
    }
}

function ForestRiver()
{
    ctx.fillStyle = 'rgb(0, 200, 255)';
    ctx.fillRect(0, 600, 1000, 100);

    if (GameMode == 'RiverEnd')
    {
        ctx.fillStyle = 'rgb(0, 200, 255)';
        ctx.fillRect(800, 0, 200, 600);
    }
    
}

function WatchOut()
{
    if (Zone7Timer < 3)
    {
        ctx.font = '60px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('WATCH OUT', 300, 350);
    }
    
}

function DontTouch()
{
    if (GameMode == 'Zone7' && Zone7Timer <= 0)
    {
        ctx.font = '40px Arial';
        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillText('Dont Touch!', 100, 650);
    }
}

function StartGame()
{
    GameCanvas = document.getElementById('canvas');
    ctx = GameCanvas.getContext('2d');

    window.addEventListener('keyup', KeyUpEvent, true);
    window.addEventListener('keydown', KeyDownEvent, true);
    window.addEventListener('click', MouseClick, true);

    Player1 = new Player(500, 640, 4);               //(500, 640, 5);

    Wizard = new NPC(70, 630, 100, 100, 'Wizard', 'rgb(0, 100, 100)');
    LBlock = new NPC(200, 50, 250, 100, 'Left', 'rgb(100, 100, 100)');
    RBlock = new NPC(600, 50, 250, 100, 'Right', 'rgb(100, 100, 100)');
    Z8Chest = new NPC(920, 60, 120, 80, 'z8chest', 'rgb(75, 40, 0)');
    RiddlePanel = new NPC(500, 150, 100, 100, 'RiddlePanel', 'rgb(0, 100, 100)', 0);
    UnderPantCastle = new NPC(390, 200, 600, 300, 'UnderPantCastle', 'rgb(248, 203, 2)');
    Teleporter = new NPC(850, 125, 150, 150, 'Teleporter', 'rgb(0, 50, 200)', 0);
    UnderPantHole = new WhiteBox(340, 250);
    Z9Gate = new Gate(500, 450, 1000, 20);

    BlocksZ1[0] = new BlockZ1(0, 0, 20, 700);
    BlocksZ1[1] = new BlockZ1(20, 680, 980, 20);

    BlocksZ2[0] = new BlockZ2(0, 0, 1000, 20);

    BlocksZ4[0] = new BlockZ4(0, 0, 20, 700);
    BlocksZ4[1] = new BlockZ4(980, 0, 20, 700);

    BlocksZ5[0] = new BlockZ5(0, 680, 1000, 20);
    BlocksZ5[1] = new BlockZ5(0, 0, 20, 680);

    BlocksZ7[0] = new BlockZ7(0, 0, 20, 700);
    BlocksZ7[1] = new BlockZ7(20, 0, 980, 20);

    BlocksZ8[0] = new BlockZ8(980, 0, 20, 700);
    BlocksZ8[1] = new BlockZ8(0, 0, 1000, 20);

    BigStars[0] = new BigStar(900, 60, 90, 105, 'YellowStar', 'rgb(255, 255, 0)');
    BigStars[1] = new BigStar(900, 300, 90, 105, 'GreenStar', 'rgb(0, 255, 0)');
    BigStars[2] = new BigStar(900, 560, 90, 105, 'PinkStar', 'rgb(255, 0, 255)');
    LittleStars[0] = new LittleStar(860, 200, 50, 65, 'YellowStar', 'rgb(255, 255, 0)');
    LittleStars[1] = new LittleStar(940, 200, 50, 65, 'GreenStar', 'rgb(0, 255, 0)');
    LittleStars[2] = new LittleStar(860, 460, 50, 65, 'PinkStar', 'rgb(255, 0, 255)');
    LittleStars[3] = new LittleStar(940, 460, 50, 65, 'RedStar', 'rgb(255, 0, 0)');

    for (var y = 100; y < 6 * 100 + 100; y += 100)
    {
        new MovingNPC(60, y, 'rgb(0, 255, 0)', 10);
    }

    for (var y = 5; y < 7 * 100 + 5; y += 100)
    {
        new SafeZone(y);
    }

    for (var x = 50; x < 10 * 100; x += 100)
    {
        new TreeZ2(x, 20);
    }
    
    for (var x1 = 30; x1 < 8 * 100; x1 += 100)
    {
        new TreeZ3(x1, 0);
    }

    for (var y = 20; y < 17 * 40 + 20; y += 40)
    {
        for (var c = 820; c < 5 * 40 + 820; c += 40)
        {
            new DBlockZ5(c, y, 39, 39);
        }
    }

    for (var y = 580; y < 3 * 40 + 580; y += 40)
    {
        for (var c = 40; c < 3 * 40 + 40; c += 40)
        {
            new DBlockZ5(c, y, 39, 39);
        }
    }

    for (var y = 40; y < 17 * 40 + 40; y += 40)
    {
        for (var c = 820; c < 5 * 40 + 820; c += 40)
        {
            new DBlockZ7(c, y, 39, 39);
        }
    }

    for (var y = 520; y < 5 * 40 + 520; y += 40)
    {
        for (var x = 30; x < 24 * 40 + 30; x += 40)
        {
            new DBlockZ8(x, y, 39, 39);
        }
    }

    FBlocksZ5[0] = new FBlockZ5(880, 160, 50, 50);
    FBlocksZ5[1] = new FBlockZ5(880, 340, 50, 50);
    FBlocksZ5[2] = new FBlockZ5(880, 520, 50, 50);

    Zone4Monster = new Monster (500, 350);

    MainLoop();
}

function KeyDownEvent(key_event)
{
    if (key_event.key == 'a')
    {
        AKeyDown = true;
    }
    
    if (key_event.key == 'w')
    {
        WKeyDown = true;
    }
    
    if (key_event.key == 's')
    {
        SKeyDown = true;
    }
    
    if (key_event.key == 'd')
    {
        DKeyDown = true;
    }
    
    if (key_event.key == 'i' && !IPressed)
    {
        Player1.FireUp();
        IPressed = true;
    }
    
    if (key_event.key == 'j' && !JPressed)
    {
        Player1.FireLeft();
        JPressed = true;
    }
    
    if (key_event.key == 'k' && !KPressed)
    {
        Player1.FireDown();
        KPressed = true;
    }
    
    if (key_event.key == 'l' && !LPressed)
    {
        Player1.FireRight();
        LPressed = true;
    }
}

function KeyUpEvent(key_event)
{
    if (key_event.key == 'a')
    {
        AKeyDown = false;
    }
    
    if (key_event.key == 'w')
    {
        WKeyDown = false;
    }
    
    if (key_event.key == 's')
    {
        SKeyDown = false;
    }
    
    if (key_event.key == 'd')
    {
        DKeyDown = false;
    }
    
    if (key_event.key == 'i')
    {
        IPressed = false;
    }
    
    if (key_event.key == 'j')
    {
        JPressed = false;
    }
    
    if (key_event.key == 'k')
    {
        KPressed = false;
    }
    
    if (key_event.key == 'l')
    {
        LPressed = false;
    }
}

function MouseClick(Event)
{
    var x = Event.layerX;
    var y = Event.layerY;

    if(Wizard.isClicked(x,y) && !Next3)
    {
        if (Player1.x < 300 && Player1.y > 400)
        {
            Wizard.clicked = true;
        }
    }
    else if (Wizard.isClicked(x,y) && Next3)
    {
        if (Player1.x < 300 && Player1.y > 400)
        {
            Wizard.clicked = true;
            Next4 = true;
        }
    }

    for (var t = 0; t < BigStars.length; t++)
    {

        if (BigStars[t].isClicked(x, y))
        {
            BigStars[t].Clicked();
        }
        else
        {
            BigStars[t].NotClicked();
        }
    }
    for (var t1 = 0; t1 < LittleStars.length; t1++)
    {

        if (LittleStars[t1].isClicked(x, y))
        {
            LittleStars[t1].Clicked();
        }
        else
        {
            LittleStars[t1].NotClicked();
        }
    }
    if (Z8Chest.isClicked(x,y))
    {
        Z8Chest.clicked = true;
    }

    if (UnderPantCastle.isClicked(x,y))
    {
        if (Player1.y < 450 && GameMode == 'Zone9')
        {
            UnderPantCastle.clicked = true;
            Next3 = true;
            Wizard.clicked = false;
        }
    }

    if (GameMode == 'Zone8' && Z8Chest.clicked)
    {
        if (x > 250 && x < 500 && y > 200 && y < 250)
        {
            PlayerLife();
        }
        if (x > 250 && x < 500 && y > 250 && y < 300)
        {
            PlayerLife();
        }
        if (x > 250 && x < 500 && y > 300 && y < 350)
        {
            Next = true;
            WellDone();
        }
        if (x > 500 && x < 750 && y > 200 && y < 250)
        {
            PlayerLife();
        }
        if (x > 500 && x < 750 && y > 250 && y < 300)
        {
            PlayerLife();
        }
        if (x > 500 && x < 750 && y > 300 && y < 350)
        {
            PlayerLife();
        }
    }

    if (GameMode == 'Zone10' && RiddlePanel.touched)
    {
        if (x > 100 && x < 250 && y > 500 && y < 600)
        {
            PlayerLife();
        }
        if (x > 750 && x < 900 && y > 500 && y < 600)
        {
            PlayerLife();
        }
        if (x > 425 && x < 575 && y > 500 && y < 600)
        {
            Next2 = true;
            Correct();
        }
    }
}

function GiveQuest()
{
    if(GameMode == 'ForestEntrance' && Wizard.clicked && !Next3)
    {
        ctx.fillStyle = 'rgb(0, 255, 255)';
        ctx.fillRect(250, 150, 500, 200);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Hi! Im the Wizard around these parts!', 260, 200)
        ctx.fillText('Please brave the dungeon and bring me some', 260, 225)
        ctx.fillText('Sexy Underpants ;)  its bloody cold standing out here!', 260, 250)
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillText('To find the answers you seek, you must seperate', 260, 285)
        ctx.fillText('yourself from the others, what makes you unique?', 260, 310)
    }
    else if (GameMode == 'ForestEntrance' && Wizard.clicked && Next4)
    {
        ctx.fillStyle = 'rgb(0, 255, 255)';
        ctx.fillRect(250, 150, 500, 200);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Thank you adventurer! Now I look sexy again!', 280, 200)
        ctx.fillText('Hope you had fun!', 400, 275)
    }
}

function GiveRiddle()
{
    if (GameMode == 'Zone10' && RiddlePanel.touched)
    {
        ctx.fillStyle = 'rgb(0, 200, 200)';
        ctx.fillRect(100, 500, 150, 100);
        ctx.font = '25px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Targaryen', 125, 550);
        

        ctx.fillStyle = 'rgb(0, 200, 200)';
        ctx.fillRect(425, 500, 150, 100);
        ctx.font = '25px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Stark', 475, 550);

        ctx.fillStyle = 'rgb(0, 200, 200)';
        ctx.fillRect(750, 500, 150, 100);
        ctx.font = '25px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Lannister', 775, 550);

        ctx.fillStyle = 'rgb(50, 250, 250)';
        ctx.fillRect(250, 300, 500, 50);
        ctx.font = '22px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Which House in GoT has the symbol of the wolf?', 260, 330);
    }
}

function PassRequired()
{
    if (GameMode == 'Zone8' && Z8Chest.clicked)
    {
        
        
        ctx.fillStyle = 'rgb(0, 255, 255)';
        ctx.fillRect(250, 150, 500, 50);

        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(250, 200, 250, 50);

        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(250, 250, 250, 50);

        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillRect(250, 300, 250, 50);

        ctx.fillStyle = 'rgb(255, 0, 0)';
        ctx.fillRect(500, 200, 250, 50);

        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillRect(500, 250, 250, 50);

        ctx.fillStyle = 'rgb(0, 255, 0)';
        ctx.fillRect(500, 300, 250, 50);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Password Required! Lose a life if wrong!', 320, 180)

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Charmander', 550, 230);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Charmander', 300, 330);
        
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Squirtle', 300, 230);
        
        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Squirtle', 550, 280);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Bulbasaur', 300, 280);

        ctx.font = '20px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Bulbasaur', 550, 330);

        ctx.beginPath();
        ctx.moveTo(250, 200);
        ctx.lineTo(750, 200);        
        ctx.strokeStyle = 'rgb(0, 0, 0)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(250, 250);
        ctx.lineTo(750, 250);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, 300);
        ctx.lineTo(750, 300);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(250, 350);
        ctx.lineTo(750, 350);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(500, 200);
        ctx.lineTo(500, 350);
        ctx.stroke();
    }
}

function WellDone()
{
    if (Next)
    {
        ctx.fillStyle = 'rgb(0, 255, 255)';
        ctx.fillRect(250, 150, 500, 200);
        ctx.font = '50px Arial';
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fillText('Nicely remembered!', 280, 215);
        ctx.fillText('You may continue :)', 280, 270);
        ctx.font = '30px Arial';
        ctx.fillText('If you have destroyed the blocks...', 270, 325);
    }
}

function Correct()
{
    if (Next2)
    {
        ctx.fillStyle = 'rgb(50, 250, 250)';
        ctx.fillRect(250, 375, 500, 75);

        ctx.font = '25px Arial';
        ctx.fillStyle = 'rgb(0, 0, 255)';
        ctx.fillText('Well Done! Go to the UnderPants Castle!', 270, 420);
    }
}

function MainLoop()
{
    ctx.clearRect(0, 0, 1000, 700);

    

    if (GameMode == 'ForestEntrance')
    {
        
    
        Player1.update();
        if(Next4)
        {
            Player1.speed = 0;
        }
        
        Zone4Monster.update();
        Wizard.update();

        if(Player1.x < 300 && Player1.y > 400)
        {
            GiveQuest();
        }

        for (var t = 0; t < BlocksZ1.length; t++)
        {
            BlocksZ1[t].update();
        }

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }
    }
    else if (GameMode == 'ForestRiver')
    {
       
        ForestRiver();
        Player1.update();
        
        for (var t2 = 0; t2 < BlocksZ2.length; t2++)
        {
            BlocksZ2[t2].update();
        }

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        for (var t3 = 0; t3 < TreesZ2.length; t3++)
        {
            TreesZ2[t3].update();
        }
    }
    else if (GameMode == 'Zone4')
    {
        Player1.update();
        Zone4Monster.update();

        for (var t4 = 0; t4 < BlocksZ4.length; t4++)
        {
            BlocksZ4[t4].update();
        }

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }
    }
    else if (GameMode == 'RiverEnd')
    {
        ForestRiver();
        Player1.update();
        for (var bs = 0; bs < BigStars.length; bs++)
        {
            BigStars[bs].update();
        }

        for (var ls = 0; ls < LittleStars.length; ls++)
        {
            LittleStars[ls].update();
        }

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        for (var t4 = 0; t4 < TreesZ3.length; t4++)
        {
            TreesZ3[t4].update();
        }
    }

    else if (GameMode == 'Zone7')
    {
        Player1.update();
        LBlock.update();
        RBlock.update();
        WatchOut();

        Zone7Timer += 1/60;

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        for (var t5 = 0; t5 < BlocksZ7.length; t5++)
        {
            BlocksZ7[t5].update();
        }

        for (var t6 = 0; t6 < DBlocksZ7.length; t6++)
        {
            DBlocksZ7[t6].update();
        }
    }
    
     else if (GameMode == 'Zone8')
     {
        Player1.update();
        Z8Chest.update();
        PassRequired();
        WellDone();

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        for (var t7 = 0; t7 < BlocksZ8.length; t7++)
        {
            BlocksZ8[t7].update();
        }

        for (var t = 0; t < DBlocksZ8.length; t++)
        {
            DBlocksZ8[t].update();
        }
     }

     else if (GameMode == 'Zone5')
     {
        Player1.update();

        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        for (var t = 0; t < BlocksZ5.length; t++)
        {
            BlocksZ5[t].update();
        }

        for (var t = 0; t < FBlocksZ5.length; t++)
        {
            FBlocksZ5[t].update();
        }

        for (var t = 0; t < DBlocksZ5.length; t++)
        {
            DBlocksZ5[t].update();
        }

     }
     
     else if (GameMode == 'Zone6')
     {

        Zone6Timer += (1/20);

        for (var t = 0; t < SafeZones.length; t++)
        {
            SafeZones[t].update();
        }
        for (var t = 0; t < MovingNPCs.length; t++)
        {
            MovingNPCs[t].update();
        }

         for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        Player1.update();

     }

     else if (GameMode == 'Zone9')
     {
        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        if (UnderPantCastle.clicked)
        {
            Teleporter.update();
            if (Teleporter.touched)
            {
                Teleport();
            }
        }
        
        UnderPantCastle.update();
        UnderPantHole.update();
        Z9Gate.update();
        Player1.update();
        
     }

     else if (GameMode == 'Zone10')
     {
        for (var b = 0; b < Bullets.length; b++)
        {
            Bullets[b].update();
        }

        RiddlePanel.update();
        GiveRiddle();
        Correct();
        Player1.update();

     }


    setTimeout(MainLoop, 16);
}

window.onload = function(e)
{
    console.log('Game Started');
    StartGame();
}

// t7 last used in mainloop