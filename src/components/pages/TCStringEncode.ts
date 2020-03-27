import BigFormSelect from '../forms/BigFormSelect.vue';
import CheckboxBoolean from '../forms/CheckboxBoolean.vue';
import Countries from '../../model/Countries';
import DateField from '../forms/DateField.vue';
import FormField from '../forms/FormField';
import FormSelect from '../forms/FormSelect.vue';
import Json from '@iabtcf/core';
import OpenIssueLink from '../OpenIssueLink.vue';
import TCStringInput from '../forms/TCStringInput.vue';
import TextField from '../forms/TextField.vue';
import {Component, Vue} from 'vue-property-decorator';
import {TCModel, GVL, TCString, Vendor, Purpose, Feature} from '@iabtcf/core';

@Component({
  components: {
    'big-form-select': BigFormSelect,
    'checkbox-boolean': CheckboxBoolean,
    'date-field': DateField,
    'form-select': FormSelect,
    'open-issue-link': OpenIssueLink,
    'tc-string-input': TCStringInput,
    'text-field': TextField,
  },
})
export default class extends Vue {

  private tcModel: TCModel = new TCModel();
  private vendors_: FormField[] = [];
  private purposes_: FormField[] = [];
  private specialFeatures_: FormField[] = [];
  private formFields: FormField[] = [
    {value: 'cmpId', text: 'CMP ID'},
    {value: 'cmpVersion', text: 'CMP Version'},
    {value: 'consentScreen', text: 'Consent Screen'},
  ];

  private boolFields: FormField[] = [
    {value: 'isServiceSpecific', text: 'Is Service Specific'},
    {value: 'purposeOneTreatment', text: 'Special Purpose One Treatment'},
    {value: 'useNonStandardStacks', text: 'Publisher Uses Non-Standard Stacks'},
  ];

  private isReady: boolean = false;

  private created(): void {
    this.tcModel.gvl = new GVL();
    this.listenForGVLChanges();
    this.tcModel.cmpId = Math.trunc(Math.random()*1000);
  }

  private listenForGVLChanges(): void {

    this.isReady = false;
    this.tcModel.gvl.readyPromise.then((): void => {

      const vendors = this.tcModel.gvl.vendors;

      for (const id in vendors) {

        if (vendors.hasOwnProperty(id)) {

          const vendor: Vendor = vendors[id];

          this.vendors_.push({
            text: `[${id}] ${vendor.name}`,
            value: id,
          });

        }

      }

      const purposes = this.tcModel.gvl.purposes;

      for (const id in purposes) {

        if (purposes.hasOwnProperty(id)) {

          const purpose: Purpose = purposes[id];
          this.purposes_.push({
            text: `[${id}] ${purpose.name}`,
            value: id,
          });

        }

      }

      const specialFeatures = this.tcModel.gvl.specialFeatures;

      for (const id in specialFeatures) {

        if (specialFeatures.hasOwnProperty(id)) {

          const specialFeature: Feature = specialFeatures[id];
          this.specialFeatures_.push({
            text: `[${id}] ${specialFeature.name}`,
            value: id,
          });

        }

      }

      this.isReady = true;

    });

  }

  private onVendorListSet(selectedVersion: number): void {

    if(selectedVersion) {

      this.listenForGVLChanges();

    }
  }
  private get languages(): FormField[] {

    const retr:FormField[] = [];

    TCModel.consentLanguages.forEach((lang: string): void => {

      retr.push({
        text: lang,
        value: lang,
      });

    });
    return retr;

  }

  private get countries(): FormField[] {

    return Countries.getFormFields();

  }

  private get vendors(): FormField[] {

    return this.vendors_;

  }

  private get purposes(): FormField[] {

    return this.purposes_;

  }

  private get specialFeatures(): FormField[] {

    return this.specialFeatures_;

  }

  private get vendorListVersions(): FormField[] {

    const latest = this.tcModel.gvl.vendorListVersion;
    const retr:FormField[] = [];
    
    for(let i = 1; i <=latest; i++) {
      const str = i.toString();
      retr.push({
        value: str,
        text: str,
      });

    }

    return retr;

  }

}
