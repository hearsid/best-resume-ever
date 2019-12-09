<template>
  <div class="resume">
    <div class="banner">
      <div class="banner__info">
        <div
          class="banner__fullname"
        >{{ person.name.first }} {{ person.name.middle }} {{ person.name.last }}</div>
        <div class="banner__position">{{ person.position }}</div>
      </div>
      <div class="banner__contact">
        <div class="section-link">
          <i class="section-link__icon material-icons">business</i>
          {{ person.contact.city }}
        </div>

        <a class="section-link" :href="contactLinks.email">
          <i class="section-link__icon material-icons">mail</i>
          {{ person.contact.email }}
        </a>

        <div class="section-link">
          <i class="section-link__icon material-icons">phone</i>
          {{ person.contact.phone }}
        </div>
      </div>
      <!-- <div
        v-if="person.birth"
        class="banner__location"
      >{{ lang.born }} {{person.birth.year}} {{ lang.bornIn }} {{person.birth.location}}</div>-->
    </div>

    <div class="content">
      <div class="content__left">
        <div class="section">
          <div class="section-headline">{{ lang.network }}</div>

          <div class="section-content section-content--plain social">
            <a v-if="person.contact.website" class="section-link" :href="person.contact.website">
              <i class="section-link__icon fa fa-globe"></i>
            </a>

            <a v-if="person.contact.linkedin" class="section-link" :href="contactLinks.linkedin">
              <i class="section-link__icon fab fa-linkedin"></i>
            </a>

            <a v-if="person.contact.github" class="section-link" :href="contactLinks.github">
              <i class="section-link__icon fab fa-github"></i>
            </a>

            <a v-if="person.contact.medium" class="section-link" :href="contactLinks.medium">
              <i class="section-link__icon fab fa-medium"></i>
            </a>

            <a
              v-if="person.contact.stackoverflow"
              class="section-link"
              :href="contactLinks.stackoverflow"
            >
              <i class="section-link__icon fab fa-stack-overflow"></i>
            </a>

            <a
              v-if="person.contact.stackoverflow"
              class="section-link"
              :href="contactLinks.hackerrank"
            >
              <i class="section-link__icon fab fa-hackerrank"></i>
            </a>
          </div>
        </div>

        <div v-if="person.skills" class="section">
          <div class="section-headline">{{ lang.skills }}</div>

          <div class="section-content-grid">
            <div
              v-for="(skill, index) in person.skills"
              class="grid-item"
              :key="index"
              :href="skill.url"
            >
              <span class="squarred-grid-item">{{ skill.name }}</span>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-headline">{{ lang.about }}</div>

          <div class="section-content section-content--plain">
            {{ person.about }}
            <br />
            <br />
            {{ person.knowledge }}
          </div>
        </div>
      </div>

      <div class="content__right">
        <div class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">work</i>
            {{ lang.experience }}
          </div>

          <md-card>
            <md-list>
              <div
                v-for="(experience, index) in person.experience"
                :key="index"
                class="section-content__item"
                :href="experience.website"
              >
                <md-list-item class="md-list-item-content">
                  <div>
                    <!-- <div class="md-subhead">{{ experience.position }}</div> -->
                    <div class="md-title">{{ experience.company }}</div>
                    <div class="md-caption">{{ experience.timeperiod }}</div>
                    <div class="md-body-1">{{ experience.description }}</div>
                  </div>
                </md-list-item>
                <md-divider v-if="index !== person.experience.length - 1"></md-divider>
              </div>
            </md-list>
          </md-card>
        </div>

        <div class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">school</i>
            {{ lang.education }}
          </div>

          <md-card>
            <md-list>
              <div
                v-for="(education, index) in person.education"
                :key="index"
                class="section-content__item"
                :href="education.website"
              >
                <md-list-item>
                  <div>
                    <!-- <div class="md-subhead">{{ experience.position }}</div> -->
                    <div class="md-title">{{ education.school }}</div>
                    <div class="md-caption">{{ education.timeperiod }}</div>
                    <div class="md-body-1">{{ education.description }}</div>
                  </div>
                </md-list-item>
                <md-divider v-if="index !== person.education.length - 1"></md-divider>
              </div>
            </md-list>
          </md-card>
        </div>
        <div class="pagebreak"> </div>
        <div v-if="person.projects" class="section">
          <div class="section-headline">
            <i class="section-headline__icon material-icons">code</i>
            {{ lang.projects }}
          </div>

          <md-card>
            <md-list>
              <div
                v-for="(project, index) in person.projects"
                :key="index"
                class="section-content__item"
                :href="project.url"
              >
                <md-list-item>
                  <div>
                    <div class="md-title">{{ project.name }}</div>
                    <div class="md-caption">{{ project.platform }}</div>
                    <div class="md-body-1">{{ project.description }}</div>
                  </div>
                </md-list-item>
                <md-divider v-if="index !== person.projects.length - 1"></md-divider>
              </div>
            </md-list>
          </md-card>
        </div>

        <div v-if="person.contributions" class="section">
          <div class="section-headline">
            <i class="section-headline__icon fa fa-heart"></i>
            {{lang.contributions}}
          </div>

          <md-card>
            <md-list>
              <div
                v-for="(contribution, index) in person.contributions"
                :key="index"
                class="section-content__item"
                :href="contribution.url"
              >
                <md-list-item>
                  <div>
                    <div class="md-title">{{ contribution.name }}</div>
                    <div class="md-caption">{{ contribution.url }}</div>
                    <div class="md-body-1">{{ contribution.description }}</div>
                  </div>
                </md-list-item>
                <md-divider v-if="index !== person.contributions.length - 1"></md-divider>
              </div>
            </md-list>
          </md-card>
        </div>

        <div v-if="person.certifications" class="section">
          <div class="section-headline">
            <i class="section-headline__icon fa fa-book"></i>
            {{lang.certifications}}
          </div>

          <md-card>
            <md-list>
              <div
                v-for="(certification, index) in person.certifications"
                :key="index"
              >
                <md-list-item>
                  <div>
                    <!-- <img
                      v-bind:src="getCertificationCompany(certification)"
                      class="certification-icon"
                      alt="certification website url"
                    /> -->
                    <i class="fa fa-bookmark"></i>
                    <a class="md-body-1 certification-link" :href="certification.url">{{ certification.name }}</a>
                  </div>
                </md-list-item>
              </div>
            </md-list>
          </md-card>
        </div>
      </div>
    </div>

    <img class="picture" />
  </div>
</template>

<script>
import Vue from 'vue';
import { getVueOptions } from './options';

const name = 'cool-extended';
export default Vue.component(name, getVueOptions(name));
</script>

<style lang="less">
@accent-color: #34495e;
@banner-color: #039be5;
@banner-height: 120px;
@picture-size: 120px;
@picture-offset: 55px;
@base-padding: 30px;
@left-column-width: 340px;

@media print {
    // .pagebreak { page-break-before: always; }
    .md-card { box-shadow: none !important; border: 1px solid gray;}
}

.md-title {
  font-size: 18px;
}

a {
  color: inherit;
  cursor: pointer;
  text-decoration-line: none;

  &:visited {
    color: inherit;
  }
}

.resume {
  position: relative;
  font-family: "Geneva" !important;
  font-size: 0.9em;
}

.certification-icon {
  width: 20px;
  height: 20px;
  border-radius: 10px;
}

.certification-link {
  text-decoration: none !important;
  color: black !important;
}

.picture {
  position: absolute;
  top: @banner-height - @picture-offset;
  left: 157px; // @left-column-width + @base-padding * 2 - @picture-size / 2;
  height: @picture-size;
  width: @picture-size;
  border-radius: 50%;
  border: 5px solid @accent-color;
  content: url("../../resume/id.jpg");
  z-index: 2;
}

.md-list-item-content {
  white-space: normal !important;
}

.banner {
  // width: calc(100% - @base-padding * 2);
  height: @banner-height;
  background-color: @banner-color;
  /*
    background-image: url('../../resume/banner.png');
    background-repeat: no-repeat;
    background-size: cover;
  */
  color: white;
  display: flex;
  align-items: center;

  & > div {
    display: inline-block;
  }

  &__info {
    padding: @base-padding;
  }

  &__fullname {
    font-size: 32px;
  }

  &__position {
    font-size: 16px;
  }
  &__contact {
    margin-left: auto;
    padding: 10px;

    .section-link {
      margin: 0px;
    }
  }
}

.content {
  display: flex;
  width: 100%;
  height: 100%;

  &__left,
  &__right {
    // height: 100%;
    padding: 20px;
  }

  &__left {
    width: 30%;
    color: rgba(255, 255, 255, 0.59);
    background-color: @accent-color;

    .section-headline {
      color: white;
    }
  }

  &__right {
    flex: 1;
    width: 70%;
  }
}

.social {
  .section-link {
    display: inline-block !important;
  }
}

.section {
  margin: 20px 0;
}

.section-link,
.section-headline {
  display: flex !important;
  align-items: center;
  color: @accent-color;
  display: inline-block;
  font-size: 1.2em;
  margin: 8px 0;

  &__icon {
    margin-right: 8px;
    font-size: 1.4em;
  }
}

.section-link {
  font-size: 1.1em;
  color: rgba(255, 255, 255, 0.59) !important;

  &__icon {
    color: white;
  }
}

.section-content {
  margin-top: 5px;
  padding-left: 32px;
  font-size: 14px;

  &__item {
    display: block;
    margin-bottom: 5px;
  }

  &__header {
    display: block;
    font-size: 1.1em;
    font-weight: 500;
  }

  &__subheader {
    display: block;
    font-weight: 400;
  }

  &__plain,
  &__text {
    display: block;
    font-size: 12px;

    &--light {
      font-size: 12px;
    }
  }

  &__plain {
    display: inline;
    font-weight: 300;
  }

  &__item-grid {
    flex: 1 1 0;
    margin-bottom: 5px;
    padding-right: 5px;
  }

  &--plain {
    padding: 0;
  }
}

.section-content-grid {
  display: flex;
  flex-wrap: wrap;
  margin-top: 5px;
  margin-bottom: 5px;
}

.grid-item {
  padding-right: 5px;
}

.squarred-grid-item {
  display: block;
  border: 1px solid white;
  color: white;
  margin-top: 5px;
  padding: 5px;
}
</style>
