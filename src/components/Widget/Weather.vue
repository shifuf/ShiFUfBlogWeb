<template>
    <div class="city-weather-cloudy">
        <div class="current-weather__bg">
            <div class="current-weather__location">
                <div class="current-weather__name">
                    <h1>柳州市</h1>
                    <span>广西/中国</span>
                </div>
                <!-- <p class="current-time">2024.3-9</p> -->
            </div>
            <div class="current-live">
                <div class="current-live__item">
                    <img src="/assets/img/weather/clouds.png" alt="" />
                </div>
                <div class="current-live__item">
                    <div>
                        <p>多云</p>
                        <p>20°C</p>
                    </div>
                    <p class="air-tag ">
                        <span>空气质量</span>
                        <span>优</span>
                    </p>
                </div>
                <div class="current-abstract">
                    <div>
                        <p>风向</p>
                        <p>东北</p>
                    </div>
                    <div>
                        <p>湿度</p>
                        <p>80%</p>
                    </div>
                    <div>
                        <p>风速</p>
                        <p>3m/s</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
.city-weather-cloudy {
    background-image: -webkit-linear-gradient(225deg,
            #d0dae8,
            #ccd4df 55%,
            #a5b3c5);
    border-radius: 16px;

    .current-weather__bg {
        padding: 20px;
        background-size: 346px auto;
        background: url('/assets/img/weather/cloudy--day.png');

        .current-weather__location {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .current-weather__name {
                display: flex;
                align-items: center;

                h1 {
                    font-size: 20px;
                    margin-right: 10px;
                }

                span {
                    font-size: 12px;
                    font-weight: 300;
                    color: var(--text-black);
                    margin-left: 10px;
                }
            }

            /*.current-time {
                line-height: 16px;
                font-weight: 300;
                color: var(--text-black);
                text-align: right;
            }*/
        }

        .current-live {
            margin-top: 20px;
            white-space: nowrap;

            .current-live__item {
                display: inline-block;
                vertical-align: middle;
                position: relative;
                width: 50%;
                max-width: 50%;

                img {
                    width: 78px;
                    height: 78px;
                }
            }

            .current-live__item:first-child {
                text-align: right;
            }

            .current-live__item:last-child {
                text-align: left;
            }

            .air-tag {
                position: absolute;
                top: -35px;
                right: 0;
                background: rgb(96 130 165 / 10%);
                padding: 5px 10px;
                border-radius: 20px;
            }

            .current-abstract {
                display: flex;
                height: 70px;
                padding: 0 21px;
                border-radius: 12px;
                background: rgba(96, 130, 165, 0.1);
                align-items: center;
                justify-content: space-between;
                text-align: center;
                div{
                    padding: 0 5px;
                }
                div p:last-child{
                        font-size: 13px;
                        color: var(--text-black);
                        margin: 0;
                }
            }
        }
    }
}

@media screen and (max-width: 1300px) {
.current-abstract{

}
}
</style>
