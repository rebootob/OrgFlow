import fs from 'fs';
import path from 'path';

const envPath = path.join(process.cwd(), '.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
envContent.split(/\r?\n/).forEach(line => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
        const [key, ...values] = trimmed.split('=');
        process.env[key.trim()] = values.join('=').trim();
    }
});

const baseUrl = process.env.KINTONE_BASE_URL.replace(/\/$/, '');
const h = {
    'X-Cybozu-Authorization': Buffer.from(process.env.KINTONE_USERNAME + ':' + process.env.KINTONE_PASSWORD).toString('base64'),
    'Authorization': 'Basic ' + Buffer.from(process.env.BASIC_AUTH_USER + ':' + process.env.BASIC_AUTH_PASS).toString('base64')
};

async function getRaw() {
    // App 53 records: 507 (9042), 390 (9000), 358 (9036), 382 (9000)
    const res53 = await fetch(baseUrl + '/k/v1/records.json?app=53&query=' + encodeURIComponent('$id in (507, 390, 358, 382)'), { headers: h });
    const data53 = await res53.json();
    console.log('=== APP 53 RAW RECORDS ===');
    data53.records.forEach(r => {
        console.log({
            record_id: r.$id.value,
            emp_text: r.emp_text?.value,
            Number: r.Number?.value,
            Text_0_Thai: r.Text_0?.value,
            Text_English: r.Text?.value,
            Text_2_Position: r.Text_2?.value,
            Drop_down_0_Dept: r.Drop_down_0?.value,
            Drop_down_Sec: r.Drop_down?.value,
            Drop_down_1_Sec: r.Drop_down_1?.value,
            Drop_down_2: r.Drop_down_2?.value,
            Text_1_Manager: r.Text_1?.value,
            Text_3: r.Text_3?.value,
            Text_4_Email: r.Text_4?.value,
            Text_7: r.Text_7?.value,
            Radio_button_Status: r.Radio_button?.value
        });
    });

    // App 791 matches
    const res791 = await fetch(baseUrl + '/k/v1/records.json?app=791&query=' + encodeURIComponent('entity_code in ("POS-141", "POS-024", "POS-000", "POS-016", "9042", "9000", "9036") or title_en in ("Mr.Shinichiro Sato", "Tomita", "Ms.Erika Gaya", "PANU")'), { headers: h });
    const data791 = await res791.json();
    console.log('\n=== APP 791 LEGACY MATCHES ===');
    data791.records.forEach(r => {
        console.log({
            record_id: r.$id.value,
            master_type: r.master_type?.value,
            entity_code: r.entity_code?.value,
            title_th: r.title_th?.value,
            title_en: r.title_en?.value,
            parent_code: r.parent_entity_code?.value,
            parent_name: r.parent_entity_name?.value,
            is_active: r.is_active?.value
        });
    });

    // App 792 history
    const res792 = await fetch(baseUrl + '/k/v1/records.json?app=792&query=' + encodeURIComponent('employee_ref in ("9042", "9000", "9036", "507", "390", "358", "382")'), { headers: h });
    const data792 = await res792.json();
    console.log('\n=== APP 792 ASSIGNMENT HISTORY ===');
    data792.records.forEach(r => {
        console.log({
            record_id: r.$id.value,
            employee_ref: r.employee_ref?.value,
            dept_code: r.dept_code?.value,
            section_code: r.section_code?.value,
            pos_code: r.pos_code?.value,
            effective_start_date: r.effective_start_date?.value,
            effective_end_date: r.effective_end_date?.value,
            assignment_type: r.assignment_type?.value
        });
    });
}

getRaw();
