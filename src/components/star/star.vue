<template>
    <div class="star" :class="starType">
        <span v-for="(itemClass,idx) in itemClasses" :class="itemClass" class="star-item" :key="idx"></span>
    </div>
</template>
<script>

  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'

  export default{
    props: {
      size: { 
        // 传入的size变量,设置变量类型
        type: Number 
      },
      score: { 
        // 传入的score变量
        type: Number
      }
    },
    computed: {
      starType () { 
        // 通过计算属性,返回组装过的类型,用来对应class类型
        return 'star-' + this.size
      },
      itemClasses () {
        let result = [] 
        // 计算所有星星的数量
        let score = Math.floor(this.score * 2) / 2 
        // 非整数星星判断
        let hasDecimal = score % 1 !== 0
        // 整数星星判断  
        let integer = Math.floor(score)  
        for (let i = 0; i < integer; i++) { 
          // 整数星星使用on
          result.push(CLS_ON) 
        }
        if (hasDecimal) { 
          // 非整数星星使用half
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) { 
          // 余下的用无星星补全,使用off
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import '../../common/stylus/mainxin' 

  .star
    .star-item
      display: inline-block
      background-repeat: no-repeat
    &.star-48 // 48尺寸的星星
      .star-item // 每一个星星的基本css信息
        width: 20px
        height: 20px
        margin-right: 22px // 每一个星星dom都有外边距
        background-size: 20px 20px
        &:last-child // 最后一个的外边距就是0
          margin-right: 0
        &.on // 全星状态的class
          bg-image('star48_on')
        &.half // 半星状态的class
          bg-image('star48_half')
        &.off // 无星状态的class
          bg-image('star48_off')
    &.star-36
      .star-item
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star36_on')
      &.half
        bg-image('star36_half')
      &.off
        bg-image('star36_off')
    &.star-24
      .star-item
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
      &:last-child
        margin-right: 0
      &.on
        bg-image('star24_on')
      &.half
        bg-image('star24_half')
      &.off
        bg-image('star24_off')
</style>